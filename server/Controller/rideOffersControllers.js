
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
        res.jsend.success({
          ride_offers: response.rows[0],
        });
      }
    });
  },
  createRideOffer(req, res) {
    const {
      source, destination, time, driver, numberOfSeats, passengers,
    } = req.body;
    if (source && destination && time && driver && numberOfSeats && passengers) {
      const seats = parseInt(numberOfSeats, 10);
      db('INSERT INTO ride_offers ' +
            `('${seats}', '${destination}',` +
            ` '${source}', '${driver}' ,` +
            `'${time}', '${passengers}'` +
      ')', (error, response) => {
        if (error) {
          console.log('error from createrideoffer is ==> ', error);
          res.jsend.fail({
            message: 'Ride offer could not be created',
            error,
          });
        }
        if (response) {
          const rideOffer = response.rows[0];
          res.jsend.success({
            message: 'Ride offer created succesfully',
            rideOffer,
          });
        }
      });
    } else {
      res.jsend.fail({ message: 'Please fill out all ride offers details asked for.' });
    }
  },
};
