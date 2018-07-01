
import db from '../Models/db/connectToDb';

export default {
  listRideOffers(req, res) {
    db('SELECT * FROM ride_offers LIMIT 4', (error, response) => {
      if (error) {
        res.jsend.fail({
          message: 'An error occurred. Could not complete your query',
        });
      }
      if (response) {
        if (response.rows.length === 0) {
          res.jsend.fail({
            message: 'Ride-offer requested does not exist',
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
      source, destination, time, driver, numberOfSeats, passengers,
    } = req.body;
    const { decoded } = req;
    let driverId;
    if (decoded) {
      db('INSERT INTO drivers (fk_users_id, name) VALUES ' +
        `('${decoded.userId}', '${decoded.username}'` +
        ') RETURNING id', (error, response) => {
        if (error) {
          res.jsend.fail({
            message: 'Driver could not be created',
            detail: error.message,
            error,
          });
        }
        if (response) {
          if (response.rows.length === 0) {
            res.jsend.fail({
              message: 'Request was completed but did not return any result',
            });
          } else {
            driverId = response.rows[0].id;
            if (source && destination && time && driver && numberOfSeats && passengers) {
              const seats = parseInt(numberOfSeats, 10);
              db('INSERT INTO ride_offers (number_of_seats, destination, ' +
                    'source, driver, time, fk_drivers_id, passengers)VALUES ' +
                    `('${seats}', '${destination}',` +
                    ` '${source}', '${driver}', ` +
                    `'${time}', '${driverId}', '${passengers}' ` +
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
                    res.jsend.fail({
                      message: 'Request was completed but did not return any response',
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
          }
        }
      });
    } else {
      res.jsend.fail({ message: 'You are not authorized to consume this endpoint' });
    }
  },
  getARide(req, res) {
    const { rideId } = req.params;
    db(`SELECT * FROM ride_offers WHERE id=${rideId}`, (error, response) => {
      if (error) {
        res.jsend.fail({
          message: 'Ride offer could not be created',
          detail: error.message,
        });
      }
      if (response) {
        if (response.rows.length === 0) {
          res.jsend.fail({
            message: 'Ride offer requested does not exist',
          });
        } else {
          const ride = response.rows[0];
          res.jsend.success({
            ride,
          });
        }
      }
    });
  },
  requestToJoinARide(req, res) {
    const { rideId } = req.params;
    const { decoded } = req;
    let passengerId;
    if (decoded) {
      db('INSERT INTO passengers (fk_users_id, name) VALUES ' +
        `( '${decoded.userId}', '${decoded.usename}' ` +
        ') RETURNING id', (error, response) => {
        if (error) {
          res.jsend.fail({
            message: 'Driver could not be created',
            detail: error.message,
            error,
          });
        }
        if (response) {
          if (response.rows.length === 0) {
            res.jsend.fail({
              message: 'Request was completed but did not return any result',
            });
          } else {
            passengerId = response.rows[0].id;
            if (rideId) {
              db('')
            } else {
              res.jsend.fail({ message: 'The ride you would like to join was not stated' });
            }
          }
        }
      });
    } else {
      res.jsend.fail({ message: 'You are not authorized to consume this endpoint' });
    }
  },
};
