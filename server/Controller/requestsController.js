
import db from '../Models/db/connectToDb';

class RequestsController {
  static getAllRideRequests(req, res) {
    const { rideId } = req.params;
    db(
      `SELECT name FROM requests WHERE rideoffer_id=${rideId}`,
      (error, response) => {
        if (error) {
          res.status(500).jsend.error({
            code: 500,
            message: 'An error occurred while processing your request',
          });
        }
        if (response.rows.length) {
          const passengers = [];
          response.rows.forEach(passenger => passengers.push(passenger));
          res.jsend.success({
            message: 'Request completed sucessfully',
            passengers,
          });
        } else {
          res.status(404).jsend.success({
            code: 404,
            message: 'The ride-offer you selected does not exist',
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
              res.status(500).jsend.error({
                code: 500,
                message: 'An error occurred while processing you request',
              });
            }
            if (response.rows.length) {
              const passengerName = response.rows[0].name;
              if (passengerName) {
                db(`SELECT passengers FROM ride_offers WHERE id=${rideId}`, (errors, Response) => {
                  if (errors) {
                    res.status(500).jsend.error({
                      code: 500,
                      message: 'An error occured while fetching passengers for the ride',
                    });
                  }
                  if (Response.rows[0]) {
                    let newPassengersArray = [];
                    if (Response.rows[0].passengers === null) {
                      newPassengersArray.push(passengerName);
                    } else {
                      newPassengersArray = Response.rows[0].passengers.concat(passengerName);
                    }
                    db(
                      `UPDATE ride_offers SET passengers = '{${newPassengersArray}}' 
                      WHERE id=${rideId}`,
                      (err, resp) => {
                        if (err) {
                          res.status(500).jsend.error({
                            code: 500,
                            message: 'An error occurred while trying to add the passenger',
                          });
                        }
                        if (resp) {
                          db(`DELETE FROM requests WHERE id=${requestId}`, (anyError) => {
                            if (anyError) {
                              res.status(500).jsend.error({
                                code: 500,
                                message: 'An error occurred while completing the request for this ride.',
                              });
                            } else {
                              res.status(200).jsend.success({
                                code: 200,
                                message: 'Passenger added to ride succesfully',
                              });
                            }
                          });
                        }
                      },
                    );
                  } else {
                    res.status(404).jsend.success({
                      code: 404,
                      message: 'The ride querried does not exist',
                      passenger: null,
                    });
                  }
                });
              } else {
                res.status(200).jsend.success({
                  code: 200,
                  message: 'There is no passenger associated with this request',
                  passenger: null,
                });
              }
            } else {
              res.status(404).jsend.success({
                code: 400,
                message: 'The request you selected does not exist.',
                data: null,
              });
            }
          },
        );
      }
      if (isAccepted === 'false') {
        db(`DELETE FROM requests WHERE id=${requestId}`, (error, response) => {
          if (error) {
            res.status(500).jsend.error({
              code: 500,
              message: 'An error occurred when trying to delete the request from its table',
            });
          }
          if (response) {
            res.jsend.success({
              message: 'Passenger rejectetd succesfully',
            });
          }
        });
      }
    } else {
      res.status(400).jsend.fail({
        message: 'Please fill all required fields',
      });
    }
  }
}

export default RequestsController;
