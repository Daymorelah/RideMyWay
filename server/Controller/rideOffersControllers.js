
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
            code: 409,
            message: 'No rides has been created yet.',
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
    const seats = parseInt(numberOfSeats, 10);
    db('INSERT INTO ride_offers (number_of_seats, destination, ' +
            'source, driver, time, users_id)VALUES ' +
            `('${seats}', '${destination}',` +
            ` '${source}', '${driver}', ` +
            `'${time}', '${userId}' ` +
              ') RETURNING * ', (err, resp) => {
      if (err) {
        res.jsend.error({
          message: 'Your details were not saved into the database. Please try again.',
          code: 500,
        });
      }
      if (resp) {
        if (resp.rows.length === 0) {
          res.jsend.success({
            code: 409,
            message: 'Could not create ride-offer',
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
  }
  static getDetailsOfARide(req, res) {
    const { rideId } = req.params;
    db(`SELECT * FROM ride_offers WHERE id=${rideId}`, (error, response) => {
      if (error) {
        res.jsend.error({
          code: 500,
          message: 'Could not get details of the ride',
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
  }
  static requestToJoinARide(req, res) {
    const { rideId } = req.params;
    const { userId } = req.decoded;
    const { passengerName } = req.body;
    db(`SELECT id FROM ride_offers WHERE id=${rideId}`, (err, resp) => {
      if (err) {
        res.jsend.error({
          code: 500,
          message: 'Could not get the ride you requested to join.',
        });
      }
      if (resp.rows.length) {
        if (resp.rows[0].id === parseInt(rideId, 10)) {
          db(`INSERT INTO requests (name, users_id,
              rideoffer_id) VALUES ('${passengerName}',
              '${userId}', '${rideId}' )`, (error, response) => {
            if (error) {
              res.jsend.error({
                code: 500,
                messsage: 'Could not add you to the request list to join the ride. Please try again.',
              });
            }
            if (response) {
              res.jsend.success({
                message: 'Your request to join the ride has been completed',
              });
            }
          });
        } else {
          res.jsend.success({
            message: 'The ride-offer you requested to join is not available',
            code: 409,
          });
        }
      } else {
        res.jsend.success({
          message: 'The ride you requested does not exist',
          code: 409,
        });
      }
    });
  }
}

export default RidesController;
