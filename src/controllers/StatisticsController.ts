import User from '../models/User.js'
import { NextFunction, Request, Response } from 'express'
import UserActivity from '../models/UserActivity.js'
import moment from 'moment'
import { Op, QueryTypes, literal } from 'sequelize'
import { sequelize } from '../db.js'

/** API Controller for the Statistics page.
 *  Statistics are saved for many functionalities in the site,
 *  they are tracked per request of the lecturers, and are logged in the DB to be retrieved in the
 *  Lecturer control page.
 *  The controller contains the following functions:
 *
 *  - getAllActivities: returns all user activity in the database
 *  - generalReport: returns general data about users in the system,
 *    such as the # of active users in the system, and groupings of the users data by age and gender, etc.
 */
class StatisticsController {
  async getAllActivities(req: Request, res: Response, next: NextFunction) {
    const allDataBySubject = await UserActivity.findAll({
      attributes: [['subject', 'key'], [literal('SUM(quantity)'), 'value']],
      group: ['subject'],
    });
    const allDataBySubjectAndAlg = await UserActivity.findAll({
      attributes: [['algorithm', 'key'], 'subject', [literal('SUM(quantity)'), 'value']],
      group: ['algorithm', 'subject'],
    });
    const reformatedData =  allDataBySubjectAndAlg.reduce((acc: any,
        item: any) => {
          if (!acc[item.dataValues.subject]) {
            acc[item.subject] = [];
          }
        acc[item.dataValues.subject].push({ key:item.dataValues.key, value:item.dataValues.value });
        return acc;
      }, {})
    return res.json({
      dataBySubject: allDataBySubject,dataByAlgAndSubject:reformatedData
    })


  }
  async generalReport(req: Request, res: Response, next: NextFunction) {
    const allRegisteredUsersCount = await User.count({ where: { role: 'Student' } })
    // An active user is a user that's logged some activity in the past 2 weeks.
    const activeUsersCount = await User.count({
      where: {
        lastSeen: { [Op.gte]: moment().subtract(14, 'days').toDate() },
        role: 'Student',
      },
    })
    const usersGroupedByGender = await sequelize.query<{ gender: string, count: string }>
      (`SELECT gender, count(*) as COUNT FROM public."Users" WHERE role = 'Student' GROUP BY gender `, { type: QueryTypes.SELECT })
    const usersGroupedByAge = await sequelize.query<{ age: number, count: string }>(
      `SELECT DATE_PART('Year', NOW())-"birthYear" as Age, count(*) as count 
            FROM public."Users" 
            WHERE role = 'Student'
            GROUP BY DATE_PART('Year', NOW())-"birthYear"
            ORDER BY DATE_PART('Year', NOW())-"birthYear"
            `, { type: QueryTypes.SELECT })

    return res.json({
      accountsData: [
        { key: 'Registered users', value: allRegisteredUsersCount },
        { key: 'Logged in (last two weeks)', value: activeUsersCount },
      ],
      usersData: {
        usersGroupedByGender: usersGroupedByGender.map(user => ({ key: user.gender, value: Number(user.count) })),
        usersGroupedByAge: usersGroupedByAge.map(user => ({ key: user.age.toString(), value: Number(user.count) })),
      },
    })
  }
}


export default new StatisticsController()