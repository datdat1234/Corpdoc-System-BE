import { db } from '../../../../utils/db/index.js';
import { getComConn } from '../../../../utils/index.js';
import { User, Token } from '../../../../models/index.js';
import { validateLogin } from '../../../validators/user.validator.js';
import {
  errorHelper,
  getText,
  logger,
  signAccessToken,
  signRefreshToken,
} from '../../../../utils/index.js';
import bcrypt from 'bcryptjs';
import { convertMap } from '@smithy/smithy-client';
const { compareSync } = bcrypt;

export default async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    let code = '00038';
    if (error.details[0].message.includes('username')) code = '00039';
    else if (error.details[0].message.includes('password')) code = '00040';

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  const companyIds = await db
      .query(`SELECT "CompanyID" FROM "Account" WHERE "Username" = '${req.body.username}'`)
      .catch((error) => {
        console.log(error);
      });

  if (!companyIds || !companyIds.rowCount) return res.status(404).json(errorHelper('00042', req));

  if (companyIds && companyIds.rowCount) {
    var companyId = companyIds.rows[0].CompanyID;
  
    const comConn = getComConn(companyId);
    
    const userInfo = await comConn
        .query(`SELECT "UserID", "Username", "Password", "Name", "Avatar", "Role", "DeptID", "Status" FROM "User" 
                WHERE "Username" = '${req.body.username}'`)
        .catch((error) => {
          console.error(error);
        });
  
    if (userInfo && userInfo.rowCount){
      const password = userInfo.rows[0].Password;
      const status = userInfo.rows[0].Status;
      const id = userInfo.rows[0].UserID;

      if (status !== "Active") return res.status(400).json(errorHelper('00017'))

      const match = bcrypt.compareSync(req.body.password, password);
      if (!match) return res.status(400).json(errorHelper('00045', req));

      const accessToken = signAccessToken(id);
      const refreshToken = signRefreshToken(id);

      //NOTE: 604800000 ms is equal to 7 days. So, the expiry date of the token is 7 days after.
      // await Token.updateOne(
      //   { userId: id },
      //   {
      //     $set: {
      //       refreshToken: refreshToken,
      //       status: true,
      //       expiresIn: Date.now() + 604800000,
      //       createdAt: Date.now(),
      //     },
      //   }
      // ).catch((err) => {
      //   return res.status(500).json(errorHelper('00046', req, err.message));
      // });

      logger('00047', id, getText('en', '00047'), 'Info', req);

      var data = {
        resultMessage: { en: getText('en', '00047'), vi: getText('vi', '00047') },
        resultCode: '00047',
        data: {
          UserID: userInfo.rows[0].UserID,
          Username: userInfo.rows[0].Username,
          Name: userInfo.rows[0].Name,
          Avatar: userInfo.rows[0].Avatar,
          Role: userInfo.rows[0].Role,
          Dept: userInfo.rows[0].DeptID,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };

      return res.send(data);
    }
    else return res.status(400).json(errorHelper("00017"));
  }
  else return res.status(400).json(errorHelper("00045"));
};

/**
 * @swagger
 * /user/login:
 *    post:
 *      summary: Login
 *      requestBody:
 *        description: Email and password information to login
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: You logged in successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string
 *        "400":
 *          description: Please provide all the required fields!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
