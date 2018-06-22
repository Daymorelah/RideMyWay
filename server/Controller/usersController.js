
import { Users, usersData } from '../Models';
import cryptData from '../Utilities/cryptData';

let id = 2;

export default {
  userSignUp(req, res) {
    const { username, password, email } = req.body;
    let encryptedPassword;
    if (username && password && email) {
      cryptData.encryptData(password).then((hash) => {
        encryptedPassword = hash;
        const newUser = new Users(username, encryptedPassword, email);
        const newUserObject = {
          id: id += 1,
          username: newUser.getUsername(),
          email: newUser.getEmail(),
          password: newUser.getPassword(),
        };
        const newUserName = newUserObject.username;
        const arrayLength = usersData.push(newUserObject);
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
  deleteAUser(req, res) {
    const { userId } = req.params;
    const foundUser = usersData.find(user => user.id === parseInt(userId, 10));
    if (foundUser === undefined) {
      res.status(404).send({ message: 'User requested is invalid' });
    } else {
      usersData.splice((userId - 1), 1);
      res.status(200).send({ message: 'User has been deleted succesfully' });
    }
  },
  updateAUser(req, res) {
    const { userId } = req.params;
    const newUserDetails = req.body;
    const foundUser = usersData.find(user => user.id === parseInt(userId, 10));
    if (foundUser === undefined) {
      res.status(404).send({ message: 'User requested no found' });
    } else {
      const index = foundUser.id;
      newUserDetails.id = index;
      const dataRemoved = usersData.splice((index - 1), 1, newUserDetails);
      if (Array.isArray(dataRemoved) && (dataRemoved.length > 0)) {
        res.status(200).send({ message: 'User\'s details has been updated successfully' });
      }
    }
  },
};

