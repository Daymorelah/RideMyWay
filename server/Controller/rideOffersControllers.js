
import db from '../Models/db/connectToDb';

export default {
  listRideOffers(req, res) {
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
      source, destination, time, driver, numberOfSeats, passengers,
    } = req.body;
    const { decoded } = req;
    if (decoded) {
      if (source && destination && time && driver && numberOfSeats && passengers) {
        const seats = parseInt(numberOfSeats, 10);
        db('INSERT INTO ride_offers (number_of_seats, destination, ' +
            'source, driver, time, passengers)VALUES ' +
            `('${seats}', '${destination}',` +
            ` '${source}', '${driver}', ` +
            `'${time}', '${passengers}' ` +
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
    } else {
      res.jsend.fail({ message: 'You are not authorized to consume this endpoint' });
    }
  },
  getDetailsOfARide(req, res) {
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
};
