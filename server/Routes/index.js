
import rideOffersControllers from '../Controller/rideOffersControllers';
import usersController from '../Controller/usersController';

const routes = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the Ride-my-way App\'s API' });
  });
  app.get('/api/v1/rides', rideOffersControllers.listRideOffers);
  app.get('/api/v1/:rideId', rideOffersControllers.getARide);
  app.post('/api/v1/rides', rideOffersControllers.createRideOffer);
  app.put('/api/v1/:rideId/requests', rideOffersControllers.joinARide);
  app.post('/api/v1/signup', usersController.userSignUp);
  app.post('/api/v1/login', usersController.userLogin);
  app.delete('/api/v1/:rideId/rides', rideOffersControllers.deleteARide);
  app.delete('/api/v1/:userId/users', usersController.deleteAUser);
  app.delete('/api/v1/:rideId/requests', rideOffersControllers.deleteUserFromRide);
};

export default routes;
