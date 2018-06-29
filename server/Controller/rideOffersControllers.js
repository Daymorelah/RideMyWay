
import db from '../Models/db/connectToDb';
// import deleteBasedOnId from '../Utilities/commonMethods';

export default {
  listRideOffers(req, res) {
    db.query('SELECT * FROM ride_offers LIMIT 4', (error, response) => {
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
  // getARide(req, res) {
  //   const { rideId } = req.params;
  //   // const rideOffer = rideOfferData.find(ride => ride.id === parseInt(rideId, 10));
  //   if (rideOffer === undefined) {
  //     res.status(404).send({ message: 'Ride offer requested is not found' });
  //   } else {
  //     res.status(200).send({ rideOffer });
  //   }
  // },
  createRideOffer(req, res) {
    const {
      source, destination, time, driver, numberOfSeats, passengers,
    } = req.body;
    if (source && destination && time && driver && numberOfSeats && passengers) {
      const seats = parseInt(numberOfSeats, 10);
      console.log('numberof seats is ==> ', numberOfSeats);
      console.log('seats is ==>', seats);
      db.query('INSERT INTO ride_offers ' +
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
  // joinARide(req, res) {
  //   const { rideId } = req.params;
  //   const rideOffer = rideOfferData.find(ride => ride.id === parseInt(rideId, 10));
  //   if (rideOffer !== undefined) {
  //     rideOffer.passengers.push(req.body.passenger);
  //     res.status(200).send({ message: 'Pasenger added to the ride successfully' });
  //   } else {
  //     res.status(404).send({ message: 'The ride you want to join is not avaiable' });
  //   }
  // },
  // deleteARide(req, res) {
  //   deleteBasedOnId(req, res, rideOfferData, 'rideId');
  // },
  // deleteUserFromRide(req, res) {
  //   const { rideId } = req.params;
  //   const { passenger } = req.body;
  //   const foundRide = rideOfferData.find(ride => ride.id === parseInt(rideId, 10));
  //   if (foundRide === undefined) {
  //     res.status(404).send({ message: 'Ride offer querried is not valid' });
  //   } else {
  //     const passengerArray = foundRide.passengers;
  //     if (passengerArray.includes(passenger)) {
  //       const index = passengerArray.indexOf(passenger);
  //       passengerArray.splice(index, 1);
  //       res.status(200).send({ message: 'user removed from the ride offer successfully' });
  //     } else {
  //    res.status(404).send({message: `user ${passenger} is not part of the ride offer querried`});
  //     }
  //   }
  // },
};
