import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import roleCheckMiddleware from '../middleware/CheckRoleMiddleware.js'
import StatisticsController from '../controllers/StatisticsController.js'
import FeedbackController from '../controllers/FeedbackController.js'

// Every route here uses the roleCheck middleware to make sure only lecturers can access the pages.
const router = Router()
router.post('/register-lecturer',roleCheckMiddleware('Lecturer'), UserController.registration)//X
router.get('/report/algo-report',roleCheckMiddleware('Lecturer'), StatisticsController.getAllActivities)//X
router.get('/report/general-report',roleCheckMiddleware('Lecturer'), StatisticsController.generalReport)//V
router.get('/feedback/get-all',roleCheckMiddleware('Lecturer'), FeedbackController.getAll)
router.delete('/feedback/delete',roleCheckMiddleware('Lecturer'), FeedbackController.delete)
export default router