
import rideOffersControllers from '../Controller/rideOffersControllers';

const routes = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the Ride-my-way App\'s API' });
  });
  app.get('/api/v1/rides', rideOffersControllers.listRideOffers);
  app.get('/api/v1/:rideId', rideOffersControllers.getARide);
};

export default routes;
