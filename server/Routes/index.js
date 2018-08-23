
import { Authenticate, Validate } from '../Utilities';
import {
  UserController,
  RidesContoller,
  RequestsController,
  FriendsController,
} from '../Controller';

const routes = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the Ride-my-way App\'s API' });
  });

  app.get('/api/v1/rides', Authenticate.checkToken, RidesContoller.getAllRideOffers);

  app.get(
    '/api/v1/rides/users/offers',
    Authenticate.checkToken,
    RidesContoller.getRidesCreatedByUSer,
  );

  app.get(
    '/api/v1/rides/:rideId',
    Authenticate.checkToken,
    Validate.ValidateGetDetailsOfARide,
    FriendsController.checkIfFriends,
    RidesContoller.getDetailsOfARide,
  );

  app.post(
    '/api/v1/users/rides',
    Authenticate.checkToken,
    Validate.ValidateCreateRideOffer,
    RidesContoller.createRideOffer,
  );

  app.post('/api/v1/auth/signup', Validate.validateSignup, UserController.userSignUp);

  app.post('/api/v1/auth/login', Validate.validateLogin, UserController.userLogin);

  app.post(
    '/api/v1/rides/:rideId/requests',
    Authenticate.checkToken,
    Validate.ValidateRequestToJoinARide,
    FriendsController.checkIfFriends,
    RidesContoller.requestToJoinARide,
  );

  app.get(
    '/api/v1/users/rides/:rideId/requests',
    Authenticate.checkToken,
    Validate.ValidateGetAllRideRequests,
    RequestsController.getAllRideRequests,
  );

  app.put(
    '/api/v1/users/rides/:rideId/requests/:requestId',
    Authenticate.checkToken,
    Validate.ValidateAcceptOrRejectARide,
    RequestsController.acceptOrRejectRequest,
  );

  app.post(
    '/api/v1/users/:usersId/friends/requests',
    Authenticate.checkToken,
    Validate.ValidateRequestToBeFriends,
    FriendsController.requestToBeFriends,
  );

  app.post(
    '/api/v1/users/:usersId/friends/',
    Authenticate.checkToken,
    Validate.ValidateAddFriend,
    FriendsController.addFriend,
  );
};

export default routes;
