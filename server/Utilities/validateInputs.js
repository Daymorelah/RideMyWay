/* eslint-disable consistent-return, no-param-reassign */
import validate from 'validator';

function trimValues(objectWithValuesToTrim) {
  Object.keys(objectWithValuesToTrim).forEach((key) => {
    objectWithValuesToTrim[key] = objectWithValuesToTrim[key].trim();
  });
}

class Validate {
  static validateSignup(req, res, next) {
    trimValues(req.body);
    const { username, password, email } = req.body;
    if (username && password && email) {
      if (!(validate.isEmpty(username) && validate.isEmpty(password) && validate.isEmpty(email))) {
        if (validate.isEmail(email)) {
          if (validate.isAlphanumeric(username) && validate.isAlphanumeric(password)) {
            next();
          } else {
            return res.status(400).jsend.fail({
              code: 400,
              message: 'Username and or password should contain only letters and numbers',
            });
          }
        } else {
          return res.status(400).jsend.fail({
            codde: 400,
            message: 'Please enter a valid email address',
          });
        }
      } else {
        return res.status(400).jsend.fail({
          code: 400,
          message: 'User details should not be empty',
        });
      }
    } else {
      res.status(400).jsend.fail({
        code: 400,
        message: 'Please enter all user details requested',
      });
    }
  }
  static validateLogin(req, res, next) {
    trimValues(req.body);
    const { username, password } = req.body;
    if (username && password) {
      if (!(validate.isEmpty(username) && validate.isEmpty(password))) {
        if (validate.isAlphanumeric(username) && validate.isAlphanumeric(password)) {
          next();
        } else {
          return res.status(400).jsend.fail({
            code: 400,
            message: 'Username and or password should contain only letters and numbers',
          });
        }
      } else {
        return res.status(400).jsend.fail({
          code: 400,
          message: 'User details should not be empty',
        });
      }
    } else {
      res.status(400).jsend.fail({
        code: 400,
        message: 'Please enter all user details requested',
      });
    }
  }
  static ValidateCreateRideOffer(req, res, next) {
    trimValues(req.body);
    const {
      source, destination, time, driver, numberOfSeats,
    } = req.body;
    if (source && destination && time && driver && numberOfSeats) {
      if (validate.isAscii(source) && validate.isLength(source, { min: 0, max: 20 })) {
        if (validate.isAscii(destination) && validate.isLength(destination, { min: 0, max: 20 })) {
          if (validate.isAscii(time) && validate.isLength(time, { min: 5, max: 13 })) {
            if (validate.isAlpha(driver) && validate.isLength(driver, { min: 0, max: 15 })) {
              if (validate.isInt(numberOfSeats) &&
                validate.isLength(numberOfSeats, { min: 0, max: 2 })) {
                next();
              } else {
                res.status(400).jsend.fail({
                  code: 400,
                  message: 'Number of seats should be a number and must be 2-digit',
                });
              }
            } else {
              res.status(400).jsend.fail({
                code: 400,
                message: 'Driver field should contain letters only.',
              });
            }
          } else {
            res.status(400).jsend.fail({
              code: 400,
              message: 'Time field should contain numbers and/or letters only',
            });
          }
        } else {
          res.status(400).jsend.fail({
            code: 400,
            message: 'Destination field must contain letters only',
          });
        }
      } else {
        res.status(400).jsend.fail({
          code: 400,
          message: 'Source should contain letters only',
        });
      }
    } else {
      res.status(400).jsend.fail({
        code: 400,
        message: 'All fields are required',
      });
    }
  }
  static ValidateGetDetailsOfARide(req, res, next) {
    trimValues(req.params);
    const { rideId } = req.params;
    if (rideId) {
      if (validate.isNumeric(rideId) && validate.isInt(rideId)) {
        next();
      } else {
        res.status(400).jsend.fail({
          code: 400,
          message: 'The ride requested should be an integer and contain only numbers',
        });
      }
    } else {
      res.status(400).jsend.fail({
        code: 400,
        message: 'Required fields are missing',
      });
    }
  }
  static ValidateRequestToJoinARide(req, res, next) {
    trimValues(req.body);
    trimValues(req.params);
    const { rideId } = req.params;
    const { passengerName } = req.body;
    if (rideId && passengerName) {
      if (validate.isNumeric(rideId) && validate.isInt(rideId)) {
        if (validate.isAlpha(passengerName) &&
        validate.isLength(passengerName, { min: 1, max: 20 })) {
          next();
        } else {
          res.status(400).jsend.fail({
            code: 400,
            message: 'Passenger name should contain letters only',
          });
        }
      } else {
        res.status(400).jsend.fail({
          code: 400,
          message: 'The ride requested should be an integer and contain only numbers',
        });
      }
    } else {
      res.status(400).jsend.fail({
        code: 400,
        message: 'Required fields are missing',
      });
    }
  }
  static ValidateGetAllRideRequests(req, res, next) {
    trimValues(req.params);
    const { rideId } = req.params;
    if (rideId) {
      if (validate.isNumeric(rideId) && validate.isInt(rideId)) {
        next();
      } else {
        res.status(400).jsend.fail({
          code: 400,
          message: 'Required params field must be an integer',
        });
      }
    } else {
      res.status(400).jsend.fail({
        code: 400,
        message: 'Required params field is missing',
      });
    }
  }
  static ValidateAcceptOrRejectARide(req, res, next) {
    trimValues(req.params);
    trimValues(req.body);
    const { rideId, requestId } = req.params;
    const { isAccepted } = req.body;
    if (rideId && requestId && isAccepted) {
      if (validate.isNumeric(rideId) && validate.isInt(rideId)) {
        if (validate.isNumeric(requestId) && validate.isInt(requestId)) {
          if (validate.isAlpha(isAccepted) && validate.isBoolean(isAccepted)) {
            next();
          } else {
            res.status(400).jsend.fail({
              code: 400,
              message: 'You must return a boolean in the body',
            });
          }
        } else {
          res.status(400).jsend.fail({
            code: 400,
            message: 'The request you want to either accept or reject must be an integer',
          });
        }
      } else {
        res.status(400).jsend.fail({
          code: 400,
          message: 'Ride number requested must be an integer',
        });
      }
    } else {
      res.status(400).jsend.fail({
        code: 400,
        message: 'Required fields are missing',
      });
    }
  }
  static ValidateRequestToBeFriends(req, res, next) {
    trimValues(req.params);
    trimValues(req.body);
    const { usersId } = req.params;
    const { name } = req.body;
    if (usersId && name) {
      if (validate.isNumeric(usersId) && validate.isInt(usersId)) {
        if (validate.isAlpha(name) &&
        validate.isLength(name, { min: 2, max: 20 })) {
          next();
        } else {
          res.status(400).jsend.fail({
            code: 400,
            message: 'Your name should contain letters only',
          });
        }
      } else {
        res.status(400).jsend.fail({
          code: 400,
          message: 'User requested must be an integer',
        });
      }
    } else {
      res.status(400).jsend.fail({
        code: 400,
        message: 'Required fields are missing',
      });
    }
  }
  static ValidateAddFriend(req, res, next) {
    trimValues(req.params);
    trimValues(req.body);
    const { usersId } = req.params;
    const { isFriendRequestAccepted } = req.body;
    if (usersId) {
      if (validate.isNumeric(usersId) && validate.isInt(usersId)) {
        if (validate.isAlpha(isFriendRequestAccepted) &&
          validate.isBoolean(isFriendRequestAccepted)) {
          next();
        } else {
          res.status(400).jsend.fail({
            code: 400,
            message: 'User requested must be an integer',
          });
        }
      } else {
        res.status(400).jsend.fail({
          code: 400,
          message: 'User requested must be an integer',
        });
      }
    } else {
      res.status(400).jsend.fail({
        code: 400,
        message: 'Required field is missing.',
      });
    }
  }
}

export default Validate;
