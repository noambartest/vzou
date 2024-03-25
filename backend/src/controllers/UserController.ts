import bcrypt from 'bcrypt'
import { NextFunction, Response } from 'express'
import pkg from 'jsonwebtoken'
import ApiError from '../error/ApiError.js'
import User from '../models/User.js'
import UserActivity from '../models/UserActivity.js'
import { RequestWithUser, TypedRequestBody } from '../types/RequestType.js'
import { CODE_TYPES, TWOFA_VERIFY_BODY } from '../types/TWOFA_Types.js'
import { ActivityBody } from '../types/UserActivityTypes.js'
import { IUser, IUserLogin, IUserRegister, IUserUpdate } from '../types/UserTypes.js'
import { ServiceSendCode } from './TwoFactorAuthController.js'
// Use sign from jsonwebtoken lib to generate a JWT token
const { sign } = pkg

/* GenerateJwt and generateConfirmMailToken both use jason web tokens to encrypt required data,
it is recommended anyone who wishes to change anything on this page have a fundamental understanding of
JWT structure, and consult the other processes that use these functions. */

export const generateJwt = (user: IUser) => {
  return sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      birthYear: user.birthYear,
      role: user.role,
      isEmailConfirmed: user.isEmailConfirmed,
      isEnabled2FA: user.isEnabled2FA,
    },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: '48h' },
  )
}
export const generateConfirmMailToken = (email: string) => {
  return sign(
    {
      email,
      type: 'VERIFY_EMAIL'
    },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: '5m' },
  )
}

/**
 * TODO: document
 */
class UserController {


  async registration(req: TypedRequestBody<IUserRegister>, res: Response, next: NextFunction) {
    const { email, birthYear, gender, lastName, firstName, password, role } = req.body
    if (!password || password.length < 8) {
      return next(ApiError.badRequest('Password should be at least 8 char length'))
    }
    // Make sure the email isn't in use.
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest('User with current email already exists'))
    }
    if (role && req?.user?.role !== 'Lecturer') {
      return next(ApiError.forbidden('Access Denied'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    try {
      const user = await User.create(
        {
          email, birthYear: birthYear, gender,
          lastName, firstName, role,
          password: hashPassword,
          lastSeen: new Date(),
          isEnabled2FA: role === 'Lecturer'
        })
      await ServiceSendCode(CODE_TYPES.VERIFY_EMAIL, user.email) // every new user must validate their email.
      return res.json({ status: 'Redirect-Email-Confirmation' })
    } catch (e: any) {
      return next(ApiError.badRequest('Input error'))
    }

  }

  async login(req: TypedRequestBody<IUserLogin>, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return next(ApiError.forbidden('Incorrect email or password'))
      }
      const comparePassword = bcrypt.compareSync(password, user.password) // authenticate received password with the one in the database.
      if (!comparePassword) {
        return next(ApiError.forbidden('Incorrect email or password'))
      }
      // Disabled for development process -> uncomment this after end of the work on project!!
      // if (!user.isEmailConfirmed) {
      //   await ServiceSendCode(CODE_TYPES.VERIFY_EMAIL, user.email)
      //   return next(ApiError.forbidden('Verify your email first, via the link that was  sent to your email'))
      // }
      if (!user.isEnabled2FA) {
        const token = generateJwt(user)

        if (user.role == 'Lecturer') {
          return res.json({
            token, status: 'OK',
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
              is2FA: user.isEnabled2FA
            },
          })
        }

        return res.json({
          token, status: 'OK',
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            birthYear: user.birthYear,
            gender: user.gender,
            is2FA: user.isEnabled2FA

          },
        })
      }
      await ServiceSendCode(CODE_TYPES.TWO_FA, user.email)
      return res.json({ status: 'Redirect-2FA', email: user.email })
    } catch (e: any) {
      console.log(e)
      const message = e?.errors?.length > 0 && e?.errors[0]?.message ? e.error[0].message : 'Login error'
      return next(ApiError.badRequest(message))
    }

  }

  async login2FA(req: TypedRequestBody<TWOFA_VERIFY_BODY>, res: Response, next: NextFunction) {
    try {
      const { email } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return next(ApiError.internal('User does not exists'))
      }
      const token = generateJwt(user)
      return res.json({ token, status: 'OK' })
    } catch (e: any) {
      console.log(e)
      const message = e?.errors?.length > 0 && e?.errors[0]?.message ? e.error[0].message : 'Login error'
      return next(ApiError.badRequest(message))
    }

  }

  async auth(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({ where: { id: req.user!.id } })
      if (!user) {
        return next(ApiError.internal('User does not exists'))
      }
      await User.update({ lastSeen: new Date() }, { where: { id: req.user!.id } })

      if (user.role == 'Lecturer') {
        return res.json(
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            is2FA: user.isEnabled2FA
          })
      }

      return res.json(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          birthYear: user.birthYear,
          gender: user.gender,
          is2FA: user.isEnabled2FA
        })

    } catch (e: any) {
      console.log(e)
      const message = e?.errors?.length > 0 && e?.errors[0]?.message ? e.error[0].message : 'Authentication error'
      return next(ApiError.badRequest(message))
    }
  }

  async personalActivities(req: RequestWithUser, res: Response, next: NextFunction) {
    const { id } = req.user!
    const allUserActivities = await UserActivity.findAll({ where: { userID: id } })
    return res.json({ allUserActivities })
  }

  async registerActivity(req: TypedRequestBody<ActivityBody>, res: Response, next: NextFunction) {
    const { subject, algorithm } = req.body
    const { id } = req.user!
    try {
      const [activity,created] = await UserActivity.findOrCreate({
        where: { userID: id, subject, algorithm,actionDate: new Date() }
      });
    
      if (!created) {
        // If the item already existed and its quantity wasn't changed, increment it
        activity.quantity += 1;
        await activity.save();
      }
    } catch (e: any) {
      if (e?.errors && e.errors.length && e.errors[0].message)
        return next(ApiError.badRequest(e?.errors[0]?.message))
      return next(ApiError.badRequest('Input error'))
    }
    return res.json({ result: 'OK' }) 
  }

  async updateUser(req: TypedRequestBody<IUserUpdate>, res: Response, next: NextFunction) {
    const { firstName, lastName, gender, birthYear, isEnabled2FA } = req.body
    const fieldsToUpdate: IUserUpdate = {}
    if (firstName) {
      fieldsToUpdate.firstName = firstName
    }
    if (typeof isEnabled2FA === "boolean") {
      fieldsToUpdate.isEnabled2FA = isEnabled2FA
    }
    if (lastName) {
      fieldsToUpdate.lastName = lastName
    }
    if (gender) {
      fieldsToUpdate.gender = gender
    }
    if (birthYear) {
      fieldsToUpdate.birthYear = birthYear
    }
    const fields = Object.keys(fieldsToUpdate)
    if (fields.length === 0) {
      return next(ApiError.badRequest('No fields to update'))
    }
    try {
      await User.update({ ...fieldsToUpdate }, { where: { email: req.user?.email } })
      const user = await User.findOne({ where: { email: req.user?.email } })
      if (!user) {
        return next(ApiError.badRequest('User does not exists'))
      }
      return res.json({
        status: 'OK', user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          birthYear: user.birthYear,
          gender: user.gender,
          is2FA: user.isEnabled2FA
        }
      })
    } catch (e: any) {
      const message = e?.errors.length > 0 && e?.errors[0]?.message ? e.error[0].message : 'Input error'
      return next(ApiError.badRequest(message))
    }

  }
}

export default new UserController()