
export default function deleteBasedOnId(req, res, dataToUse, idToCheckFor) {
  const idToUse = req.params[idToCheckFor];
  const rideOffer = dataToUse.find(ride => ride.id === parseInt(idToUse, 10));
  if (rideOffer === undefined) {
    res.status(404).send({ message: `${idToCheckFor} requested is not found` });
  } else {
    dataToUse.splice((idToUse - 1), 1);
    res.status(200).send({ message: `${idToCheckFor} has been deleted succesfully` });
  }
}
