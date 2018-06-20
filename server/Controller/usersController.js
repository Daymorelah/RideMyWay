
import { Users } from '../Models';
import { usersDetail } from '../data';
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
        const arrayLength = usersDetail.push(newUser);
        if (arrayLength > 2) {
          res.status(201).send({ message: `User ${newUserName} created succesfully` });
        } else {
          res.status(500).send({ message: 'User could not be created. Please try again' });
        }
      });
    } else {
      res.status(400).send({ message: 'Please fill all user details asked for.' });
    }
  },
};

