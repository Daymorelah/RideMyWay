import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

export default {
  /* eslint-disable consistent-return */
  checkToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return res.jsend.fail({ message: 'User not auhorized' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.jsend.fail({ message: 'Token Authentication failed' });
      }
      req.decoded = decoded;
      next();
    });
  },
};