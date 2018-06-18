
// import { RideOffers } from '../Models';
import rideOffers from '../data';

export default {
  listRideOffers(req, res) {
    res.status(200).send({ rides: rideOffers });
  },
  getARide(req, res) {
    const { rideId } = req.params;
    const rideOffer = rideOffers.find(ride => ride.id === parseInt(rideId, 10));
    if (rideOffer === undefined) {
      res.status(404).send({ message: 'Ride offer requested is not found' });
    } else {
      res.status(200).send({ rideOffer });
    }
  },
};
