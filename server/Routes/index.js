
import authenticate from '../Utilities/tokenAuth';
import rideOffersControllers from '../Controller/rideOffersControllers';
import usersController from '../Controller/usersController';

const authenticateWihtJwt = authenticate.checkToken;

const routes = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the Ride-my-way App\'s API' });
  });
  app.get('/api/v1/rides', authenticateWihtJwt, rideOffersControllers.listRideOffers);
  app.get('/api/v1/rides/:rideId', rideOffersControllers.getDetailsOfARide);
  app.post('/api/v1/users/rides', authenticateWihtJwt, rideOffersControllers.createRideOffer);
  app.post('/api/v1/rides/:rideId/requests', authenticateWihtJwt, rideOffersControllers.requestToJoinARide);
  app.post('/api/v1/auth/signup', usersController.userSignUp);
  app.post('/api/v1/auth/login', usersController.userLogin);
  // app.delete('/api/v1/:rideId/rides', rideOffersControllers.deleteARide);
  // app.delete('/api/v1/:userId/users', usersController.deleteAUser);
  // app.delete('/api/v1/:rideId/requests', rideOffersControllers.deleteUserFromRide);
  // app.put('/api/v1/:userId/users', usersController.updateAUser);
};

export default routes;
