import jwt from 'jsonwebtoken';

const secrete = process.env.SECRETE;

export default {
  /* eslint-disable consistent-return */
  checkToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return res.jsend.fail({ message: 'User not auhorized' });
    }
    jwt.verify(token, secrete, (err, decoded) => {
      if (err) {
        return res.jsend.fail({ message: 'Token Authentication failed' });
      }
      req.decoded = decoded;
      next();
    }); // end of verification
  }, // end of check token
}; // end of export default
