
window.onload = () => {
  let showOffers = document.getElementById("show-offers");
  let setRideOffer = document.getElementById("set-ride-offer");

  document.getElementById("check-ride-offers").addEventListener('click', showRideoffers);
  document.getElementById("offer-a-ride").addEventListener('click', showOfferARide);
  document.getElementById("check-offered-rides").addEventListener('click', showOfferedRides);

  function showRideoffers() {
    let listOfRideOffers = `<ul>` ;
    for(let i = 0; i < 5; i++) {
      listOfRideOffers += `<li> <img src="../images/download2.png"/>Destination: Surulere`
      +`<br/> Origin: Victoria Island <br/> Time: 7:00 AM</li>`;
    }
    listOfRideOffers += `</ul>`;
    setRideOffer.style.display = 'none';
    showOffers.style.display = 'block';
    showOffers.innerHTML = listOfRideOffers;
  }

  function showOfferARide() {
    showOffers.style.display = "none";
    setRideOffer.style.display = 'block';
  }

  function showOfferedRides() {
    let acceptButton = `<input type='submit' value='accept' />`;
    let declineButton = `<input type='submit' value='decline' />`;
    let listOfRideOffers = `<ul>` ;
    for(let i = 0; i < 5; i++) {
      listOfRideOffers += `<li> <img src="../images/download2.png"/> Agbolahan Adeshola `
      +`<br/>would like to ride with you <div id='choose-offer-container'>${acceptButton}`
      +`${declineButton}</div></li>`;
    }
    listOfRideOffers += `</ul>`;
    setRideOffer.style.display = 'none';
    showOffers.style.display = 'block';
    showOffers.innerHTML = listOfRideOffers;
  }

  showRideoffers();
}