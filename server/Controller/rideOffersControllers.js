
import db from '../Models/db/connectToDb';

export default {
  getAllRideOffers(req, res) {
    db('SELECT * FROM ride_offers LIMIT 4', (error, response) => {
      if (error) {
        res.jsend.fail({
          message: 'An error occurred. Please try again',
        });
      }
      if (response) {
        if (response.rows.length === 0) {
          res.jsend.fail({
            ride_offers: null,
          });
        } else {
          res.jsend.success({
            ride_offers: response.rows,
          });
        }
      }
    });
  },
  createRideOffer(req, res) {
    const {
      source, destination, time, driver, numberOfSeats,
    } = req.body;
    const { userId } = req.decoded;
    if (userId) {
      if (source && destination && time && driver && numberOfSeats) {
        const seats = parseInt(numberOfSeats, 10);
        db('INSERT INTO ride_offers (number_of_seats, destination, ' +
            'source, driver, time, fk_users_id)VALUES ' +
            `('${seats}', '${destination}',` +
            ` '${source}', '${driver}', ` +
            `'${time}', '${userId}' ` +
              ') RETURNING * ', (err, resp) => {
          if (err) {
            res.jsend.fail({
              message: 'Ride-offer could not be created',
              detail: err.message,
              err,
            });
          }
          if (resp) {
            if (resp.rows.length === 0) {
              res.jsend.success({
                message: 'Request was completed but did not return any response',
                rideOfferCreated: null,
              });
            } else {
              const rideOfferCreated = resp.rows[0];
              res.jsend.success({
                message: 'Ride-offer created succesfully',
                rideOfferCreated,
              });
            }
          }
        });
      } else {
        res.jsend.fail({ message: 'Please fill out all ride offers details asked for.' });
      }
    } else {
      res.jsend.fail({ message: 'You are not authorized to consume this endpoint' });
    }
  },
  getDetailsOfARide(req, res) {
    const { rideId } = req.params;
    if (rideId) {
      db(`SELECT * FROM ride_offers WHERE id=${rideId}`, (error, response) => {
        if (error) {
          res.jsend.fail({
            message: 'Ride offer could not be created',
            detail: error.message,
          });
        }
        if (response) {
          if (response.rows.length === 0) {
            res.jsend.success({
              message: 'Ride offer requested does not exist',
              ride: null,
            });
          } else {
            const ride = response.rows[0];
            res.jsend.success({
              ride,
            });
          }
        }
      });
    } else {
      res.jsend.fail({
        message: 'Required fields are missing',
      });
    }
  },
  requestToJoinARide(req, res) {
    const { rideId } = req.params;
    const { userId } = req.decoded;
    const { passengerName } = req.body;
    if (rideId && userId && passengerName) {
      db(`SELECT id FROM ride_offers WHERE id=${rideId}`, (err, resp) => {
        if (resp.rows.length) {
          if (resp.rows[0].id === parseInt(rideId, 10)) {
            db(`INSERT INTO requests (name, fk_users_id,
              fk_rideoffer_id) VALUES ('${passengerName}',
              '${userId}', '${rideId}' )`, (error, response) => {
              if (error) {
                res.jsend.fail({
                  messsage: 'An error occured. Your request could not be completed.',
                  detail: error.message,
                  error,
                });
              }
              if (response) {
                res.jsend.success({
                  message: 'Your request to join the ride has been completed',
                });
              }
            });
          } else {
            res.jsend.fail({
              message: 'The ride-offer you requested to join is not valid',
            });
          }
        } else {
          res.jsend.fail({
            message: 'Your request could not be completed at the moment. Please try again',
          });
        }
      });
    } else {
      res.jsend.fail({
        message: 'Required fields are missing',
      });
    }
  },
  getAllRideRequests(req, res) {
    const { rideId } = req.params;
    db(
      `SELECT name FROM requests WHERE fk_rideoffer_id=${rideId}`,
      (error, response) => {
        if (error) {
          res.jsend.fail({
            message: 'An error occurred while processing your request',
            detail: error.message,
            error,
          });
        }
        if (response.rows.length) {
          const passengers = [];
          for (let i = 0; i < response.rows.length; i += 1) {
            passengers.push(response.rows[i].name);
          }
          res.jsend.success({
            message: 'Request completed sucessfully',
            passengers,
          });
        } else {
          res.jsend.success({
            message: 'Request completed sucessfully but ther was no response.',
            passengers: null,
          });
        }
      },
    );
  },
  acceptOrRejectRequest(req, res) {
    const { rideId, requestId } = req.params;
    const { isAccepted } = req.body;
    if (rideId && requestId && isAccepted) {
      if (isAccepted === 'true') {
        db(
          `SELECT name FROM requests WHERE id=${requestId}`,
          (error, response) => {
            if (error) {
              res.jsend.fail({
                message: 'An error occurred while processing you request',
                detail: error.message,
                error,
              });
            }
            if (response.rows.length) {
              const passengerName = response.rows[0].name;
              if (passengerName) {
                let newPassengersString = [];
                db(`SELECT passengers FROM ride_offers WHERE id=${rideId}`, (errors, Responce) => {
                  if (errors) {
                    res.jsend.fail({
                      message: 'An error occured while selecting processig your requests',
                      detail: errors.message,
                      error: errors,
                    });
                  }
                  if (Responce.rows[0]) {
                    if (Responce.rows[0].passengers === null) {
                      newPassengersString.push(passengerName);
                    } else {
                      newPassengersString = Responce.rows[0].passengers.concat(passengerName);
                    }
                    db(
                      `UPDATE ride_offers SET passengers='{${newPassengersString}}' WHERE id=${rideId}`,
                      (err, resp) => {
                        if (err) {
                          res.jsend.fail({
                            message: 'An error occurred while updating processing your request',
                            detail: err.message,
                            err,
                          });
                        }
                        if (resp) {
                          // remember to change id=${rideid} to requestId
                          db(`DELETE FROM requests WHERE id=${rideId}`, (anyError) => {
                            if (anyError) {
                              res.jsend.fail({
                                message: 'An error occurred while processing your request',
                                error: anyError,
                              });
                            }
                          });
                          res.jsend.success({
                            message: 'Passenger added to ride succesfully',
                            resp: resp.rows,
                          });
                        }
                      },
                    );
                  } else {
                    res.jsend.success({
                      message: 'Your request was successful but didn\'t return any data',
                      data: null,
                    });
                  }
                });
              } else {
                res.jsend.success({
                  message: 'Your request was successful but didn\'t return any data',
                  data: null,
                });
              }
            } else {
              res.jsend.success({
                message: 'Request successful but no data was sent',
                data: null,
              });
            }
          },
        );
      }
      if (isAccepted === 'false') {
        db(`DELETE FROM requests WHERE id=${requestId}`, (error, response) => {
          if (error) {
            res.jsend.fail({
              message: 'An error occurred while processing you request',
              detail: error.message,
              error,
            });
          }
          if (response) {
            res.jsend.success({
              message: 'Passenger rejectetd succesfully',
            });
          }
        });
      }
    } else {
      res.jsend.fail({
        message: 'Please fill all required fields',
      });
    }
  },
};
