
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../Models/db/connectToDb';
import cryptData from '../Utilities/cryptData';

dotenv.config();
const secrete = process.env.SECRETE;

export default {
  userSignUp(req, res) {
    const { username, password, email } = req.body;
    let encryptedPassword;
    if (username && password && email) {
      cryptData.encryptData(password).then((hash) => {
        encryptedPassword = hash;
        db(
          'INSERT INTO users (username, password, email) ' +
                  `VALUES ('${username}',` +
                  ` '${encryptedPassword}',` +
                  ` '${email}') RETURNING *`,
          (error, response) => {
            if (error) {
              res.jsend.fail({
                message: 'user could not be created',
              });
            }
            if (response) {
              const result = response.rows[0];
              const token = jwt.sign({
                userId: result.id,
                username: result.username,
                email: result.email,
              }, secrete, { expiresIn: '1 day' });
              res.jsend.success({
                message: 'User created succesfully',
                token,
              });
            }
          },
        );
      }).catch((error) => {
        res.jsend.error({
          code: 500,
          message: 'Please fill all user details asked for.',
          data: error.message,
        });
      });
    } else {
      res.jsend.fail({ message: 'Please fill all user details asked for.' });
    }
  },
  userLogin(req, res) {
    const { username, password } = req.body;
    if (username && password) {
      db(`SELECT username,password FROM users WHERE username = '${username}'`, (error, response) => {
        if (error) {
          res.jsend.fail({
            message: 'Username or password is invalid',
            error,
          });
        }
        if (response) {
          const result = response.rows[0];
          cryptData.decryptData(password, result.password)
            .then((isPasswordCorrect) => {
              if (isPasswordCorrect) {
                const token = jwt.sign({
                  userId: result.id,
                  username: result.username,
                  email: result.email,
                }, secrete, { expiresIn: '1 day' });
                res.jsend.success({
                  message: `User ${result.username} logged in seccessfully`,
                  token,
                });
              } else {
                res.jsend.fail({
                  message: 'Username or password is invalid',
                });
              }
            })
            .catch(() => res.jsend.error({
              code: 500,
              message: 'An error occurd while fufilling your request. Please try again.',
            }));
        }
      });
    } else {
      res.jsend.fail({ message: 'Please fill all user details asked for.' });
    }
  },
};

