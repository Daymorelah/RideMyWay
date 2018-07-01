
import createUSersTable from './users';
import createRideoffersTable from './rideoffers';
import createPassengersTable from './passengers';
import createDriversTable from './drivers';
import createRideoffersPassengersTable from './rideoffers_passengers';

createUSersTable();
setTimeout(createPassengersTable, 1000);
setTimeout(createDriversTable, 1500);
setTimeout(createRideoffersTable, 2000);
setTimeout(createRideoffersPassengersTable, 3000);
