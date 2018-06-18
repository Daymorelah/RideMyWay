
// import { RideOffers } from '../Models';
import rideOffers from '../data';

export default {
  listRideOffers(req, res) {
    res.status(200).send({ rides: rideOffers });
  },
};
