import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

class Authenticate {
  /* eslint-disable consistent-return */
  static checkToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return res.jsend.fail({
        code: 401,
        message: 'User not auhorized',
      });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.jsend.fail({
          code: 401,
          message: 'Authentication failed',
        });
      }
      req.decoded = decoded;
      next();
    });
  }
}

export default Authenticate;
