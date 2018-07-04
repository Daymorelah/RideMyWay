
import authenticate from '../Utilities/tokenAuth';
import { UserController, RidesContoller } from '../Controller';

const authenticateWihtJwt = authenticate.checkToken;

const routes = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the Ride-my-way App\'s API' });
  });
  app.get('/api/v1/rides', authenticateWihtJwt, RidesContoller.getAllRideOffers);
  app.get('/api/v1/rides/:rideId', RidesContoller.getDetailsOfARide);
  app.post('/api/v1/users/rides', authenticateWihtJwt, RidesContoller.createRideOffer);
  app.post('/api/v1/auth/signup', UserController.userSignUp);
  app.post('/api/v1/auth/login', UserController.userLogin);
  app.post(
    '/api/v1/rides/:rideId/requests', authenticateWihtJwt,
    RidesContoller.requestToJoinARide,
  );
  app.get(
    '/api/v1/users/rides/:rideId/requests', authenticateWihtJwt,
    RidesContoller.getAllRideRequests,
  );
  app.put('/api/v1/users/rides/:rideId/requests/:requestId', authenticateWihtJwt, RidesContoller.acceptOrRejectRequest);
};

export default routes;
