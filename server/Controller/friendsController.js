
import db from '../Models/db/connectToDb';

class FriendsController {
  static checkIfFriends(req, res, next) {
    const { userId } = req.decoded;
    const { rideId } = req.params;
    db(`SELECT usersid FROM riedOffers WHERE id${rideId}`, (error, response) => {
      if (error) {
        res.status(500).jsend.error({
          code: 500,
          message: 'An error occurred trying to get the owner of the ride you want to join.',
        });
      }
      if (response.rows.length) {
        const { usersId } = response.rows[0];
        db(
          `SELECT usersid FROM friends WHERE 
          friendswithid=${usersId} AND usersid=${userId} OR
          friendswithid=${userId} AND usersid=${usersId}`,
          (err, resp) => {
            if (err) {
              res.status(500).jsend.error({
                code: 500,
                message: 'An error occurred validating if your are friends with the owner of the ride offer.',
              });
            }
            if (resp.rows[0].usersid) {
              next();
            }
          },
        );
      } else {
        res.status(404).jsend.fail({
          code: 404,
          message: 'The ride offer does not exist',
        });
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
            res.status(409).jsend.fail({
              code: 409,
              message: 'You are already frineds with this user.',
            });
          }
          if (response.rows.length) {
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
            res.status(201).jsend.success({
              code: 201,
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
    db(`INSERT INTO friendRequests (userthataskedid,userthatdecidesid, name)
    VALUES (${userId}, ${usersId} ${name}`, (error, response) => {
      if (error) {
        res.status(409).jsend.fail({
          code: 409,
          message: 'You have requested to be friends with this user already.',
        });
      }
      if (response.rows.length) {
        res.status(201).jsend({
          code: 201,
          message: 'Your friend request has been sent.',
        });
      }
    });
  }
}

export default FriendsController;
