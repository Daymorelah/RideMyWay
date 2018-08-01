
import db from '../Models/db/connectToDb';

class FriendsController {
  static checkIfFriends(req, res, next) {
    const { userId } = req.decoded;
    const { rideId } = req.params;
    db(`SELECT usersid FROM rideOffers WHERE id = ${rideId}`, (error, response) => {
      if (error) {
        res.status(500).jsend.error({
          code: 500,
          message: 'An error occurred trying to get the owner of the ride you want to join.',
        });
      }
      if (response) {
        if (response.rows.length) {
          const { usersid } = response.rows[0];
          if (usersid === userId) {
            res.status(409).jsend.fail({
              code: 409,
              message: 'Operation cannot be performed because you are the owner of this ride',
            });
          } else {
            db(
              `SELECT usersid FROM friends WHERE 
              ( friendswithid = ${usersid} ) AND ( usersid = ${userId} )`,
              (err, resp) => {
                if (err) {
                  res.status(500).jsend.error({
                    code: 500,
                    message: 'An error occurred validating if your are friends with the owner of the ride offer.',
                  });
                }
                if (resp) {
                  if (resp.rows.length) {
                    next();
                  } else {
                    res.status(409).jsend.fail({
                      code: 409,
                      message: 'You are not yet friends with the owner of this ride. Ensure you are friends and try again',
                    });
                  }
                }
              },
            );
          }
        } else {
          res.status(404).jsend.fail({
            code: 404,
            message: 'The ride offer does not exist',
            ride: null,
          });
        }
      }
    });
  }
  static addFriend(req, res) {
    const { userId } = req.decoded;
    const { usersId } = req.params;
    const { isFriendRequestAccepted } = req.body;
    if (isFriendRequestAccepted === 'true') {
      db(
        `INSERT INTO friends (usersid, friendswithid) VALUES(${usersId}, ${userId})`,
        (error, response) => {
          if (error) {
            console.log('error is ==> ', error);
            res.status(409).jsend.fail({
              code: 409,
              message: 'You are already friends with this user.',
            });
          }
          if (response) {
            db(
              `DELETE FROM friendRequests 
              WHERE userthatdecidesid=${userId} AND userthataskedid=${usersId}`,
              (err) => {
                if (err) {
                  res.status(500).jsend.error({
                    code: 500,
                    message: 'An error occurred completing your request. Please try again.',
                  });
                } else {
                  res.status(201).jsend.success({
                    code: 201,
                    message: 'You are now friends with the user.',
                  });
                }
              },
            );
          }
        },
      );
    }
    if (isFriendRequestAccepted === 'false') {
      db(
        `DELETE FROM friendRequests 
        WHERE userthatdecidesid=${userId} AND userthataskedid=${usersId}`,
        (err) => {
          if (err) {
            res.status(500).jsend.error({
              code: 500,
              message: 'An error occurred completing your request. Please try again.',
            });
          } else {
            res.status(200).jsend.success({
              code: 200,
              message: 'Friend request rejected successfully.',
            });
          }
        },
      );
    }
  }
  static requestToBeFriends(req, res) {
    const { userId } = req.decoded;
    const { usersId } = req.params;
    const { name } = req.body;
    db(`INSERT INTO friendRequests (userthataskedid, userthatdecidesid, name)
    VALUES (${userId}, ${usersId}, '${name}')`, (error) => {
      if (error) {
        res.status(409).jsend.fail({
          code: 409,
          message: 'You have requested to be friends with this user already.',
        });
      } else {
        res.status(201).jsend.success({
          code: 201,
          message: 'Your friend request has been sent.',
        });
      }
    });
  }
}

export default FriendsController;
