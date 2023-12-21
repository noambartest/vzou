import { NextFunction, Response } from 'express'
import { TypedRequestBody } from '../types/RequestType.js'
import { CODE_TYPES, TWOFA_VERIFY_BODY } from '../types/TWOFA_Types.js'
import { TWO_FA_verifier } from '../controllers/TwoFactorAuthController.js'


const Verify2FA_MW = (actionType: CODE_TYPES) => {
  return async function(req: TypedRequestBody<TWOFA_VERIFY_BODY>, res: Response, next: NextFunction) {
    try {
      const { code, type, email } = req.body
      await TWO_FA_verifier(code, type, email)
      if (actionType != type) {
        return res.status(401).json({ message: '2FA Code type mismatch' })
      }
      return next()
    } catch (e: any) {
      const message = e?.message || 'Unknown error'
      return res.status(401).json({ message })
    }
  }
}
export default Verify2FA_MW