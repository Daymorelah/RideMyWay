/* eslint-disable consistent-return */
import validate from 'validator';

class Validate {
  static validateSignup(req, res, next) {
    const { username, password, email } = req.body;
    if (username && password && email) {
      if (!(validate.isEmpty(username) && validate.isEmpty(password) && validate.isEmpty(email))) {
        if (validate.isEmail(email)) {
          if (validate.isAlphanumeric(username) && validate.isAlphanumeric(password)) {
            next();
          } else {
            return res.jsend.fail({
              code: 400,
              message: 'Username and or password should contain only letters and numbers',
            });
          }
        } else {
          return res.jsend.fail({
            codde: 400,
            message: 'Please enter a valid email address',
          });
        }
      } else {
        return res.jsend.erro({
          code: 400,
          message: 'User details should not be empty',
        });
      }
    } else {
      res.jsend.error({
        code: 400,
        message: 'Please enter all user details requested',
      });
    }
  }
  static validateLogin(req, res, next) {
    const { username, password } = req.body;
    if (username && password) {
      if (!(validate.isEmpty(username) && validate.isEmpty(password))) {
        if (validate.isAlphanumeric(username) && validate.isAlphanumeric(password)) {
          next();
        } else {
          return res.jsend.fail({
            code: 400,
            message: 'Username and or password should contain only letters and numbers',
          });
        }
      } else {
        return res.jsend.erro({
          code: 400,
          message: 'User details should not be empty',
        });
      }
    } else {
      res.jsend.error({
        code: 400,
        message: 'Please enter all user details requested',
      });
    }
  }
  static ValidateCreateRideOffer(req, res, next) {
    const {
      source, destination, time, driver, numberOfSeats,
    } = req.body;
    if (source && destination && time && driver && numberOfSeats) {
      if (validate.isAscii(source) && validate.isLength(source, { min: 0, max: 20 })) {
        if (validate.isAscii(destination) && validate.isLength(destination, { min: 0, max: 20 })) {
          if (validate.isAscii(time) && validate.isLength(time, { min: 0, max: 13 })) {
            if (validate.isAlpha(driver) && validate.isLength(driver, { min: 0, max: 15 })) {
              if (validate.isInt(numberOfSeats) &&
                validate.isLength(numberOfSeats, { min: 0, max: 2 })) {
                next();
              } else {
                res.jsend.error({
                  code: 400,
                  message: 'Number of seats should be a number and must be 2-digit',
                });
              }
            } else {
              res.jsend.error({
                code: 400,
                message: 'Driver field should contain letters only.',
              });
            }
          } else {
            res.jsend.error({
              code: 400,
              message: 'Time field should contain numbers and/or letters only',
            });
          }
        } else {
          res.jsend.error({
            code: 400,
            message: 'Destination field must contain letters only',
          });
        }
      } else {
        res.jsend.error({
          code: 400,
          message: 'Source should contain letters only',
        });
      }
    } else {
      res.jsend.error({
        code: 400,
        message: 'All fields are required',
      });
    }
  }
  static ValidateGetDetailsOfARide(req, res, next) {
    const { rideId } = req.params;
    if (rideId) {
      if (validate.isNumeric(rideId) && validate.isInt(rideId)) {
        next();
      } else {
        res.jsend.error({
          code: 400,
          message: 'The ride requested should be an integer and contain only numbers',
        });
      }
    } else {
      res.jsend.eror({
        code: 400,
        message: 'Required fields are missing',
      });
    }
  }
  static ValidateRequestToJoinARide(req, res, next) {
    const { rideId } = req.params;
    const { passengerName } = req.body;
    if (rideId && passengerName) {
      if (validate.isNumeric(rideId) && validate.isInt(rideId)) {
        if (validate.isAlpha(passengerName) &&
        validate.isLength(passengerName, { min: 1, max: 20 })) {
          next();
        } else {
          res.jsend.error({
            code: 400,
            message: 'Passenger name should contain letters only',
          });
        }
      } else {
        res.jsend.error({
          code: 400,
          message: 'The ride requested should be an integer and contain only numbers',
        });
      }
    } else {
      res.jsend.error({
        code: 400,
        message: 'Required fields are missing',
      });
    }
  }
  static ValidateGetAllRideRequests(req, res, next) {
    const { rideId } = req.params;
    if (rideId) {
      if (validate.isNumeric(rideId) && validate.isInt(rideId)) {
        next();
      } else {
        res.jsend.error({
          code: 400,
          message: 'Required params field must be an integer',
        });
      }
    } else {
      res.jsend.error({
        code: 400,
        message: 'Required params field is missing',
      });
    }
  }
  static ValidateAcceptOrRejectARide(req, res, next) {
    const { rideId, requestId } = req.params;
    const { isAccepted } = req.body;
    if (rideId && requestId && isAccepted) {
      if (validate.isNumeric(rideId) && validate.isInt(rideId)) {
        if (validate.isNumeric(requestId) && validate.isInt(requestId)) {
          if (validate.isBoolean(isAccepted)) {
            next();
          } else {
            res.jsend.error({
              code: 400,
              message: 'You must return a boolean in the body',
            });
          }
        } else {
          res.jsend.error({
            code: 400,
            message: 'The request you want to either accept or reject must be an integer',
          });
        }
      } else {
        res.jsend.error({
          code: 400,
          message: 'Ride number requested must be an integer',
        });
      }
    } else {
      res.jsend.error({
        code: 400,
        message: 'Required fields are missing',
      });
    }
  }
}

export default Validate;