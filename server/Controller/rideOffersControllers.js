
import db from '../Models/db/connectToDb';
import deleteBasedOnId from '../Utilities/commonMethods';

let id = 3;

export default {
  listRideOffers(req, res) {
    // res.status(200).send({ rides: rideOfferData });
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
  getARide(req, res) {
    const { rideId } = req.params;
    const rideOffer = rideOfferData.find(ride => ride.id === parseInt(rideId, 10));
    if (rideOffer === undefined) {
      res.status(404).send({ message: 'Ride offer requested is not found' });
    } else {
      res.status(200).send({ rideOffer });
    }
  },
  createRideOffer(req, res) {
    const {
      source, destination, time, driver,
    } = req.body;
    const rideOffer = new RideOffers(source, destination, time, driver);
    const myOffer = {
      id: id += 1,
      source: rideOffer.getSource(),
      destination: rideOffer.getDestination(),
      time: rideOffer.getTime(),
      driver: rideOffer.driver,
      passengers: rideOffer.getPassenger(),
    };
    rideOfferData.push(myOffer);
    res.status(200).send({ message: 'Ride offer created successfully' });
  },
  joinARide(req, res) {
    const { rideId } = req.params;
    const rideOffer = rideOfferData.find(ride => ride.id === parseInt(rideId, 10));
    if (rideOffer !== undefined) {
      rideOffer.passengers.push(req.body.passenger);
      res.status(200).send({ message: 'Pasenger added to the ride successfully' });
    } else {
      res.status(404).send({ message: 'The ride you want to join is not avaiable' });
    }
  },
  deleteARide(req, res) {
    deleteBasedOnId(req, res, rideOfferData, 'rideId');
  },
  deleteUserFromRide(req, res) {
    const { rideId } = req.params;
    const { passenger } = req.body;
    const foundRide = rideOfferData.find(ride => ride.id === parseInt(rideId, 10));
    if (foundRide === undefined) {
      res.status(404).send({ message: 'Ride offer querried is not valid' });
    } else {
      const passengerArray = foundRide.passengers;
      if (passengerArray.includes(passenger)) {
        const index = passengerArray.indexOf(passenger);
        passengerArray.splice(index, 1);
        res.status(200).send({ message: 'user removed from the ride offer successfully' });
      } else {
        res.status(404).send({ message: `user ${passenger} is not part of the ride offer querried` });
      }
    }
  },
};
