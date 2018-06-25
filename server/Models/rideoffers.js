
class RideOffers {
  constructor(source, destination, time, driver) {
    this.source = source;
    this.destination = destination;
    this.time = time;
    this.driver = driver;
    this.passengers = [];
  }
  getSource() {
    return this.source;
  }
  getDestination() {
    return this.destination;
  }
  getTime() {
    return this.time;
  }
  setPassenger(passenrer) {
    this.passengers.push(passenrer);
  }
  getPassenger() {
    return this.passengers;
  }
}

export default RideOffers;
