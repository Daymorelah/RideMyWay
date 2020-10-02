
import db from '../Models/db/connectToDb';

class RequestsController {
  static getAllRideRequests(req, res) {
    const { rideId } = req.params;
    db(
      `SELECT name FROM requests WHERE rideofferid=${rideId}`,
      (error, response) => {
        if (error) {
          return res.status(500).jsend.error({
            code: 500,
            message: 'An error occurred while processing your request',
          });
        }
        if (response) {
          if (response.rows.length) {
            const passengers = [];
            response.rows.forEach(passenger => passengers.push(passenger));
            return res.jsend.success({
              message: 'Request completed successfully',
              passengers,
            });
          }
          return res.status(404).jsend.fail({
            code: 404,
            message: 'No passenger has requested to join this ride yet. check back later',
            passengers: null,
          });
        }
      },
    );
  }
  static acceptOrRejectRequest(req, res) {
    const { rideId, requestId } = req.params;
    const { isAccepted } = req.body;
    if (rideId && requestId && isAccepted) {
      if (isAccepted === 'true') {
        db(
          `SELECT name FROM requests WHERE id=${requestId}`,
          (error, response) => {
            if (error) {
              return res.status(500).jsend.error({
                code: 500,
                message: 'An error occurred while processing you request',
              });
            }
            if (response.rows.length) {
              const passengerName = response.rows[0].name;
              if (passengerName) {
                db(`SELECT passengers FROM rideOffers WHERE id=${rideId}`, (errors, Response) => {
                  if (errors) {
                    return res.status(500).jsend.error({
                      code: 500,
                      message: 'An error occured while fetching passengers for the ride',
                    });
                  }
                  if (Response.rows[0]) {
                    let newPassengersArray = [];
                    (Response.rows[0].passengers === null) ?
                      newPassengersArray.push(passengerName):
                      newPassengersArray = Response.rows[0].passengers.concat(passengerName);
                    db(
                      `UPDATE rideOffers SET passengers = '{${newPassengersArray}}' 
                      WHERE id=${rideId}`,
                      (err) => {
                        if (err) {
                          return res.status(500).jsend.error({
                            code: 500,
                            message: 'An error occurred while trying to add the passenger to the request',
                          });
                        }
                        db(`DELETE FROM requests WHERE id=${requestId}`, (anyError) => {
                          if (anyError) {
                            return res.status(500).jsend.error({
                              code: 500,
                              message: 'An error occurred while completing the request for this ride.',
                            });
                          }
                          return res.status(200).jsend.success({
                            code: 200,
                            message: 'Passenger added to ride successfully',
                          });
                        });
                      },
                    );
                  }
                  return res.status(404).jsend.fail({
                    code: 404,
                    message: 'The ride querried does not exist',
                    passenger: null,
                  });
                });
              }
              return res.status(404).jsend.fail({
                code: 404,
                message: 'There is no passenger associated with this request',
                passenger: null,
              });
            }
            return res.status(404).jsend.fail({
              code: 404,
              message: 'The request you selected does not exist.',
              data: null,
            });
          },
        );
      }
      if (isAccepted === 'false') {
        db(
          `SELECT numberofseats FROM rideoffers WHERE id=${rideId}`,
          (error, response) => {
            let seats;
            if (error) {
              return res.status(500).jsend.error({
                code: 500,
                message: 'An error occurred completing your request',
              });
            }
            if (response.rows.length) {
              seats = response.rows[0].numberofseats + 1;
              db(`UPDATE rideoffers SET numberofseats=${seats} WHERE id=${rideId}`, (err) => {
                if (err) {
                  return res.status(500).jsend.error({
                    error: 500,
                    message: 'An error occured processing your request. Please try again.',
                  });
                }
                db(`DELETE FROM requests WHERE id=${requestId}`, (anyError) => {
                  if (anyError) {
                    return res.status(500).jsend.error({
                      code: 500,
                      message: 'An error occurred when trying to delete the request from its table',
                    });
                  }
                  return res.jsend.success({
                    message: 'Passenger rejected successfully',
                  });
                });
              });
            }
            return res.status(409).jsend.fail({
              code: 409,
              message: 'Ride queried does not exist.',
            });
          },
        );
      }
    }
    return res.status(400).jsend.fail({
      message: 'Please fill all required fields',
    });
  }
}

export default RequestsController;
