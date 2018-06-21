
import { Users, usersData } from '../Models';
import cryptData from '../Utilities/cryptData';

export default {
  userSignUp(req, res) {
    const { username, password, email } = req.body;
    let encryptedPassword;
    if (username && password && email) {
      cryptData.encryptData(password).then((hash) => {
        encryptedPassword = hash;
        const newUser = new Users(username, encryptedPassword, email);
        const newUserName = newUser.getUsername();
        const arrayLength = usersData.push(newUser);
        if (arrayLength > 2) {
          res.status(201).send({ message: `User ${newUserName} created succesfully` });
        } else {
          res.status(500).send({ message: 'User could not be created. Please try again' });
        }
      }).catch();
    } else {
      res.status(400).send({ message: 'Please fill all user details asked for.' });
    }
  },
  userLogin(req, res) {
    const { username, password } = req.body;
    if (username && password) {
      const foundUser = usersData.find(user => user.username === username);
      if (foundUser === undefined) {
        console.log('foundUser is ==> ', foundUser);
        res.status(404).send({ message: 'Username or password is invalid' });
      } else {
        cryptData.decryptData(password, foundUser.password)
          .then((isPasswordCorrect) => {
            if (isPasswordCorrect === true) {
              res.status(200).send({ message: `User ${foundUser.username} logged in seccessfully` });
            } else {
              res.status(400).send({ message: 'Username or password is invalid' });
            }
          })
          .catch(() => res.status(500).send({
            message: 'An error occurd while fufilling your request. Please try again.',
          }));
      }
    } else {
      res.status(400).send({ message: 'Please fill all user details asked for.' });
    }
  },
};

