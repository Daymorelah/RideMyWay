
// import { Users, usersData } from '../Models';
import db from '../Models/db/connectToDb';
import cryptData from '../Utilities/cryptData';
// import deleteBasedOnId from '../Utilities/commonMethods';

export default {
  userSignUp(req, res) {
    const { username, password, email } = req.body;
    let encryptedPassword;
    if (username && password && email) {
      cryptData.encryptData(password).then((hash) => {
        encryptedPassword = hash;
        db(`INSERT INTO users (username, password, email) VALUES ('${username}', '${encryptedPassword}', '${email}')`, (error, response) => {
          if (error) {
            res.jsend.error({
              code: 500,
              message: 'An error occured on our server',
              data: error.detail,
            });
          }
          if (response) {
            res.jsend.success({
              message: 'User created succesfully',
            });
          }
        });
      }).catch((error) => {
        res.jsend.error({ 
          code: 500,
          message: 'Please fill all user details asked for.',
          data: error.message,
        });
      });
    } else {
      res.jsend.fail({ message: 'Please fill all user details asked for.' });
    }
  },
  // userLogin(req, res) {
  //   const { username, password } = req.body;
  //   if (username && password) {
  //     const foundUser = usersData.find(user => user.username === username);
  //     if (foundUser === undefined) {
  //       res.status(404).send({ message: 'Username or password is invalid' });
  //     }
  //     cryptData.decryptData(password, foundUser.password)
  //       .then((isPasswordCorrect) => {
  //         if (isPasswordCorrect) {
  //           res.status(200).send({ message: `User ${foundUser.username} logged in seccessfully` });
  //         } else {
  //           res.status(400).send({ message: 'Username or password is invalid' });
  //         }
  //       })
  //       .catch(() => res.status(500).send({
  //         message: 'An error occurd while fufilling your request. Please try again.',
  //       }));
  //   } else {
  //     res.status(400).send({ message: 'Please fill all user details asked for.' });
  //   }
  // },
  // deleteAUser(req, res) {
  //   deleteBasedOnId(req, res, usersData, 'userId');
  // },
  // updateAUser(req, res) {
  //   const { userId } = req.params;
  //   const newUserDetails = req.body;
  //   const foundUser = usersData.find(user => user.id === parseInt(userId, 10));
  //   if (foundUser === undefined) {
  //     res.status(404).send({ message: 'User requested no found' });
  //   } else {
  //     const index = foundUser.id;
  //     newUserDetails.id = index;
  //     const dataRemoved = usersData.splice((index - 1), 1, newUserDetails);
  //     if (Array.isArray(dataRemoved) && (dataRemoved.length > 0)) {
  //       res.status(200).send({ message: 'User\'s details has been updated successfully' });
  //     }
  //   }
  // },
};

