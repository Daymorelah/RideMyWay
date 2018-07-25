
import createUsersTable from './users';
import createRideoffersTable from './rideoffers';
import createRequestsTable from './requests';
import createFriendsTable from './friends';
import createFriendRequestTable from './friendRequests';

createUsersTable().then((resultFOrUsersTable) => {
  console.log(resultFOrUsersTable);
  createRideoffersTable().then((resultForRideOffersTable) => {
    console.log(resultForRideOffersTable);
    createRequestsTable().then((resultForRequestTable) => {
      console.log(resultForRequestTable);
      createFriendsTable().then((resultForFriendsTable) => {
        console.log(resultForFriendsTable);
        createFriendRequestTable().then((resultForFriendRequestTable) => {
          console.log(resultForFriendRequestTable);
          process.exit();
        }).catch(error => console.log(error));
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }).catch(error => console.log(error));
}).catch(error => console.log(error));

