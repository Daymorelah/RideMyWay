
// import { Users, usersData } from '../Models';
import db from '../Models/db/connectToDb';
import cryptData from '../Utilities/cryptData';
// import deleteBasedOnId from '../Utilities/commonMethods';

// let id = 2;

export default {
  userSignUp(req, res) {
    const { username, password, email } = req.body;
    let encryptedPassword;
    if (username && password && email) {
      cryptData.encryptData(password).then((hash) => {
        encryptedPassword = hash;
        db(`INSERT INTO users (id, username, password, email) VALUES (1, '${username}', '${encryptedPassword}', '${email}')`, (error, response) => {
          if (error) {
            console.log('we got an error it is ==> ', error);
            res.status(500).send({message: 'An error occured on our server'});
          }
          if (response) {
            console.log('we got a responce it is ==> ', response);
            res.status(200).send({ message: 'User created succesfully' });
          }
        });
      }).catch();
    } else {
      res.status(400).send({ message: 'Please fill all user details asked for.' });
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

