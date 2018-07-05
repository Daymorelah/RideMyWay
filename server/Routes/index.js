
import { Authenticate, Validate } from '../Utilities';
import { UserController, RidesContoller, RequestsController } from '../Controller';

const routes = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the Ride-my-way App\'s API' });
  });
  app.get('/api/v1/rides', Authenticate.checkToken, RidesContoller.getAllRideOffers);
  app.get(
    '/api/v1/rides/:rideId', Authenticate.checkToken,
    Validate.ValidateGetDetailsOfARide, RidesContoller.getDetailsOfARide,
  );
  app.post(
    '/api/v1/users/rides', Authenticate.checkToken,
    Validate.ValidateCreateRideOffer, RidesContoller.createRideOffer,
  );
  app.post('/api/v1/auth/signup', Validate.validateSignup, UserController.userSignUp);
  app.post('/api/v1/auth/login', Validate.validateLogin, UserController.userLogin);
  app.post(
    '/api/v1/rides/:rideId/requests', Authenticate.checkToken,
    Validate.ValidateRequestToJoinARide, RidesContoller.requestToJoinARide,
  );
  app.get(
    '/api/v1/users/rides/:rideId/requests', Authenticate.checkToken,
    Validate.ValidateGetAllRideRequests, RequestsController.getAllRideRequests,
  );
  app.put(
    '/api/v1/users/rides/:rideId/requests/:requestId', Authenticate.checkToken,
    Validate.ValidateAcceptOrRejectARide, RequestsController.acceptOrRejectRequest,
  );
};

export default routes;
