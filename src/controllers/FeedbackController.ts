import { NextFunction, Request, Response } from 'express'
import Feedback from '../models/Feedback.js'
import { FeedBackInput } from '../types/FeedbackTypes.js'
import { Op } from 'sequelize'
import ApiError from '../error/ApiError.js'

/** API Controller for the feedback system
 *  A feedback is a text left by a site visitor, containing some form of request for support,
 *  or feedback on the site.
 *  The feedbacks are stored in the database.
 *  The controller provides the following functionalities:
 *
 *  - getAll: returns all feedbacks in the database
 *  - create: creates a new feedback
 *  - delete: deletes a list of feedbacks
 *
 *  The controller is used by the frontend to interact with the feedback system.
 */
class FeedBackController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const allData = (await Feedback.findAll()).sort((a: Feedback, b: Feedback): any => {
      return b.createdAt.getTime() - a.createdAt.getTime()
    })
    return res.json({ allData })
  }

  async create(req: Request<FeedBackInput>, res: Response, next: NextFunction) {
    const { subject, contactInfo, message } = req.body
    await Feedback.create({ subject, contactInfo: contactInfo ? contactInfo : '', message })
    return res.json({ status: 'OK' })
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { idList } = req.body
    if (!idList) {
      return next(ApiError.badRequest('idList is required'))
    }
    const deleted = await Feedback.destroy({
      where: {
        id: {
          [Op.in]: idList
        }
      }
    })
    return res.json({ deleted })
  }
}

export default new FeedBackController()
