
import { RideOffers, rideOfferData } from '../Models';

let id = 3;

export default {
  listRideOffers(req, res) {
    res.status(200).send({ rides: rideOfferData });
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
    const { rideId } = req.params;
    const rideOffer = rideOfferData.find(ride => ride.id === parseInt(rideId, 10));
    if (rideOffer === undefined) {
      res.status(404).send({ message: 'Ride offer requested is not found' });
    } else {
      rideOfferData.splice((rideId - 1), 1);
      res.status(200).send({ message: 'Ride offer has been deleted succesfully' });
    }
  },
};
