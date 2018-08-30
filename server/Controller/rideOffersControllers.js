
import db from '../Models/db/connectToDb';

class RidesController {
  static getAllRideOffers(req, res) {
    db('SELECT * FROM rideOffers LIMIT 6', (error, response) => {
      if (error) {
        res.status(500).jsend.error({
          code: 500,
          message: 'Could not retrieve ride offers',
        });
      }
      if (response) {
        if (!response.rows.length) {
          res.jsend.success({
            message: 'No rides has been created yet.',
            rideOffers: null,
          });
        } else {
          res.jsend.success({
            rideOffers: response.rows,
          });
        }
      }
    });
  }
  static createRideOffer(req, res) {
    const {
      source, destination, time, driver, numberOfSeats,
    } = req.body;
    const { userId } = req.decoded;
    const seats = parseInt(numberOfSeats, 10);
    db('INSERT INTO rideOffers (numberOfSeats, destination, ' +
            'source, driver, time, usersId)VALUES ' +
            `('${seats}', '${destination}',` +
            ` '${source}', '${driver}', ` +
            `'${time}', '${userId}' ` +
              ') RETURNING * ', (error, response) => {
      if (error) {
        res.status(500).jsend.error({
          message: 'Your details were not saved into the database. Please try again.',
          code: 500,
        });
      } else {
        const rideOfferCreated = response.rows[0];
        res.status(201).jsend.success({
          message: 'Ride-offer created succesfully',
          rideOfferCreated,
        });
      }
    });
  }
  static getDetailsOfARide(req, res) {
    const { rideId } = req.params;
    db(`SELECT * FROM rideOffers WHERE id=${rideId}`, (error, response) => {
      if (error) {
        res.status(500).jsend.error({
          code: 500,
          message: 'Could not get details of the ride',
        });
      }
      if (response) {
        const ride = response.rows[0];
        res.status(200).jsend.success({
          ride,
        });
      }
    });
  }
  static requestToJoinARide(req, res) {
    const { rideId } = req.params;
    const { userId } = req.decoded;
    const { passengerName } = req.body;
    db(`SELECT id,usersId,numberOfSeats FROM rideOffers WHERE id=${rideId}`, (err, resp) => {
      let seats;
      if (err) {
        res.status(500).jsend.error({
          code: 500,
          message: 'Could not get the ride you are requesting to join.',
        });
      }
      if (resp.rows.length) {
        if (resp.rows[0].numberofseats === 0) {
          res.status(409).jsend.fail({
            code: 409,
            message: 'This ride is all booked. No more seats available',
          });
        } else {
          seats = resp.rows[0].numberofseats - 1;
          db(`INSERT INTO requests (name, usersId,
                rideofferId) VALUES ('${passengerName}',
                '${userId}', '${rideId}' )`, (error, response) => {
            if (error) {
              res.status(409).jsend.fail({
                code: 409,
                messsage: 'You cannot join the same ride twice.',
              });
            }
            if (response) {
              db(`UPDATE rideOffers SET numberofseats=${seats} WHERE id=${rideId}`, (anyError) => {
                if (anyError) {
                  res.status(500).jsend.error({
                    code: 500,
                    message: 'An error occured completing your request. Please try again.',
                  });
                } else {
                  res.status(201).jsend.success({
                    message: 'Your request to join the ride has been completed',
                  });
                }
              });
            }
          });
        }
      } else {
        res.status(404).jsend.fail({
          message: 'The ride you requested for does not exist',
          code: 404,
        });
      }
    });
  }
  static getRidesCreatedByUSer(req, res) {
    const { userId } = req.decoded;
    db(`SELECT * FROM rideOffers WHERE usersId=${userId} LIMIT 6`, (error, response) => {
      if (error) {
        res.status(500).jsend.error({
          code: 500,
          message: 'Internal server error',
        });
      }
      if (response) {
        if (!response.rows.length) {
          res.jsend.success({
            message: 'You have not created any rides yet.',
            rideOffers: null,
          });
        } else {
          res.jsend.success({
            rideOffers: response.rows,
          });
        }
      }
    });
  }
  static getRidesTakenByUser(req, res) {
    const { username } = req.decoded;
    db(`SELECT * FROM rideOffers WHERE '${username}' = ANY (passengers) LIMIT 6`, (error, response) => {
      if (error) {
        res.status(500).jsend.error({
          code: 500,
          message: 'Internal server error',
        });
      }
      if (response) {
        if (!response.rows.length) {
          res.jsend.success({
            message: 'You have not joined any rides yet.',
            rideOffers: null,
          });
        } else {
          res.jsend.success({
            rideOffers: response.rows,
          });
        }
      }
    });
  }
}

export default RidesController;
