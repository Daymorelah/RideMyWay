
import createUsersTable from './users';
import createRideoffersTable from './rideoffers';
import createRequestsTable from './requests';

createUsersTable();
setTimeout(createRideoffersTable, 1000);
setTimeout(createRequestsTable, 1500);

