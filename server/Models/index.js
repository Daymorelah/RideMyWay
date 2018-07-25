
import createUsersTable from './users';
import createRideoffersTable from './rideoffers';
import createRequestsTable from './requests';
import createFriendsTable from './friends';
import createFriendRequestTable from './friendRequests';

createUsersTable();
setTimeout(createRideoffersTable, 1000);
setTimeout(createRequestsTable, 1500);
setTimeout(createFriendsTable, 1800);
setTimeout(createFriendRequestTable, 2000);
