
import authenticate from '../Utilities/tokenAuth';
import rideOffersControllers from '../Controller/rideOffersControllers';
import usersController from '../Controller/usersController';

const authenticateWihtJwt = authenticate.checkToken;

const routes = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the Ride-my-way App\'s API' });
  });
  app.get('/api/v1/rides', authenticateWihtJwt, rideOffersControllers.listRideOffers);
  app.get('/api/v1/rides/:rideId', rideOffersControllers.getARide);
  app.post('/api/v1/users/rides', authenticateWihtJwt, rideOffersControllers.createRideOffer);
  app.post('/api/v1/auth/signup', usersController.userSignUp);
  app.post('/api/v1/auth/login', usersController.userLogin);
};

export default routes;
