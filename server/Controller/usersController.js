
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../Models/db/connectToDb';
import { CryptData } from '../Utilities';

dotenv.config();
const secret = process.env.SECRET;

class UserController {
  static userSignUp(req, res) {
    const { username, password, email } = req.body;
    let encryptedPassword;
    CryptData.encryptData(password).then((hash) => {
      encryptedPassword = hash;
      db(
        'INSERT INTO users (username, password, email) ' +
                  `VALUES ('${username}',` +
                  ` '${encryptedPassword}',` +
                  ` '${email}') RETURNING *`,
        (error, response) => {
          if (error) {
            res.jsend.error({
              code: 500,
              message: 'Your details could not be saved on our database. Please try again',
            });
          }
          if (response) {
            if (response.rows.length === 0) {
              res.jsend.success({
                code: 409,
                message: 'Could not get the user details created',
              });
            } else {
              const result = response.rows[0];
              const token = jwt.sign({
                userId: result.id,
                username: result.username,
                email: result.email,
              }, secret, { expiresIn: '1 day' });
              res.jsend.success({
                message: 'User created succesfully',
                token,
              });
            }
          }
        },
      );
    }).catch(() => {
      res.jsend.error({
        code: 500,
        message: 'An error occured trying to save the user\'s detail',
      });
    });
  }
  static userLogin(req, res) {
    const { username, password } = req.body;
    db(`SELECT * FROM users WHERE username = '${username}'`, (error, response) => {
      if (error) {
        res.jsend.error({
          code: 500,
          message: 'An error occured trying to get the user\'s details',
        });
      }
      if (response) {
        if (response.rows.length === 0) {
          res.jsend.success({
            code: 409,
            message: 'Username or password does not exist',
          });
        } else {
          const result = response.rows[0];
          CryptData.decryptData(password, result.password)
            .then((isPasswordCorrect) => {
              if (isPasswordCorrect) {
                const token = jwt.sign({
                  userId: result.id,
                  username: result.username,
                  email: result.email,
                }, secret, { expiresIn: '1 day' });
                res.jsend.success({
                  message: `User ${result.username} logged in seccessfully`,
                  token,
                });
              } else {
                res.jsend.success({
                  code: 409,
                  message: 'Username or password is invalid',
                });
              }
            })
            .catch(() => res.jsend.error({
              code: 500,
              message: 'An error occured trying to save the user\'s details into the database.',
            }));
        }
      }
    });
  }
}

export default UserController;
