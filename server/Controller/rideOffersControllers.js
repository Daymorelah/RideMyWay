
import db from '../Models/db/connectToDb';

class RidesController {
  static getAllRideOffers(req, res) {
    db('SELECT * FROM ride_offers LIMIT 6', (error, response) => {
      if (error) {
        res.jsend.error({
          code: 500,
          message: 'Internal server error. Could not retrieve ride offers',
        });
      }
      if (response) {
        if (!response.rows.length) {
          res.jsend.success({
            ride_offers: null,
          });
        } else {
          res.jsend.success({
            ride_offers: response.rows,
          });
        }
      }
    });
  }
  static createRideOffer(req, res) {
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
            res.jsend.error({
              message: 'Ride-offer could not be created',
              code: 500,
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
  }
  static getDetailsOfARide(req, res) {
    const { rideId } = req.params;
    if (rideId) {
      db(`SELECT * FROM ride_offers WHERE id=${rideId}`, (error, response) => {
        if (error) {
          res.jsend.error({
            code: 500,
            message: 'Coudl not get details of the ride',
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
  }
  static requestToJoinARide(req, res) {
    const { rideId } = req.params;
    const { userId } = req.decoded;
    const { passengerName } = req.body;
    if (rideId && userId && passengerName) {
      db(`SELECT id FROM ride_offers WHERE id=${rideId}`, (err, resp) => {
        if (err) {
          res.jsend.error({
            code: 500,
            message: 'Could not get the ride you requested',
          });
        }
        if (resp.rows.length) {
          if (resp.rows[0].id === parseInt(rideId, 10)) {
            db(`INSERT INTO requests (name, fk_users_id,
              fk_rideoffer_id) VALUES ('${passengerName}',
              '${userId}', '${rideId}' )`, (error, response) => {
              if (error) {
                res.jsend.error({
                  code: 500,
                  messsage: 'Your requst to join the ride could not completed. Please try again.',
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
          res.jsend.success({
            message: 'Your request was completed but didn\'t return any data',
          });
        }
      });
    } else {
      res.jsend.fail({
        message: 'Required fields are missing',
      });
    }
  }
  static getAllRideRequests(req, res) {
    const { rideId } = req.params;
    db(
      `SELECT name FROM requests WHERE fk_rideoffer_id=${rideId}`,
      (error, response) => {
        if (error) {
          res.jsend.error({
            code: 500,
            message: 'An error occurred while processing your request',
          });
        }
        if (response.rows.length) {
          const passengers = [];
          response.rows.forEach(passenger => passengers.push(passenger));
          res.jsend.success({
            message: 'Request completed sucessfully',
            passengers,
          });
        } else {
          res.jsend.success({
            message: 'Request completed sucessfully but there was no response.',
            passengers: null,
          });
        }
      },
    );
  }
  static acceptOrRejectRequest(req, res) {
    const { rideId, requestId } = req.params;
    const { isAccepted } = req.body;
    if (rideId && requestId && isAccepted) {
      if (isAccepted === 'true') {
        db(
          `SELECT name FROM requests WHERE id=${requestId}`,
          (error, response) => {
            if (error) {
              res.jsend.error({
                code: 500,
                message: 'An error occurred while processing you request',
              });
            }
            if (response.rows.length) {
              const passengerName = response.rows[0].name;
              if (passengerName) {
                db(`SELECT passengers FROM ride_offers WHERE id=${rideId}`, (errors, Response) => {
                  if (errors) {
                    res.jsend.error({
                      code: 500,
                      message: 'An error occured while fetching users for the ride',
                    });
                  }
                  if (Response.rows[0]) {
                    const dbPassenger = Response.rows;
                    db(
                      `UPDATE ride_offers SET passengers = 
                      array_append(${dbPassenger},${passengerName}) 
                      WHERE id=${rideId}`,
                      (err, resp) => {
                        if (err) {
                          res.jsend.error({
                            code: 500,
                            message: 'An error occurred while trying to update the passenger\'s column',
                          });
                        }
                        if (resp) {
                          db(`DELETE FROM requests WHERE id=${requestId}`, (anyError) => {
                            if (anyError) {
                              res.jsend.error({
                                code: 500,
                                message: 'An error occurred while trying to delete the request from its table.',
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
                message: 'Request successful but didn\'t return any data',
                data: null,
              });
            }
          },
        );
      }
      if (isAccepted === 'false') {
        db(`DELETE FROM requests WHERE id=${requestId}`, (error, response) => {
          if (error) {
            res.jsend.error({
              code: 500,
              message: 'An error occurred when trying to delete the request from its table',
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
  }
}

export default RidesController;
