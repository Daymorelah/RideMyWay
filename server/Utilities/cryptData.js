import bcrypt from 'bcrypt';

function encryptData(dataToEncrypt) {
  const salt = bcrypt.genSaltSync();
  const encrypted = bcrypt.hash(dataToEncrypt, salt);
  return encrypted;
}

function decryptData(dataToDecrypt, dataBaseHash) {
  return bcrypt.compareSync(dataToDecrypt, dataBaseHash);
}

export default { encryptData, decryptData };
