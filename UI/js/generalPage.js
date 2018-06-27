
window.onload = () => {
  let showOffers = document.getElementById("show-offers");
  let setRideOffer = document.getElementById("set-ride-offer");
  let searchBy = document.getElementById("search-by");
  let paginate = document.getElementById("paginate");

  document.getElementById("check-ride-offers").addEventListener('click', showRideoffers);;
  document.getElementById("offer-a-ride").addEventListener('click', showOfferARide);;
  document.getElementById("check-offered-rides").addEventListener('click', showOfferedRides);;
  
  function showRideoffers() {
    let listOfRideOffers = `<ul>` ;
    for(let i = 0; i < 4; i++) {
      listOfRideOffers += `<li> <img src="../images/download2.png"/>Destination: Surulere`
      +`<br/> Origin: Victoria Island <br/> Time: 7:00 AM</li>`;
    }
    listOfRideOffers += `</ul>`;
    setRideOffer.style.display = 'none';
    showOffers.style.display = 'block';
    searchBy.style.display = 'block';
    paginate.style.display = 'block';
    showOffers.innerHTML = listOfRideOffers;
  }

  function showOfferARide() {
    showOffers.style.display = "none";
    setRideOffer.style.display = 'flex';
    searchBy.style.display = 'none';
    paginate.style.display = 'none';
  }

  function showOfferedRides() {
    let acceptButton = `<button>Accept</button>`;
    let declineButton = `<button>Decline</button>`;
    let listOfRideOffers = `<ul>` ;
    for(let i = 0; i < 4; i++) {
      listOfRideOffers += `<li> <img src="../images/download2.png"/> Agbolahan Adeshola `
      +`<br/>would like to ride with you ${acceptButton} ${declineButton} </li>`;
    }
    listOfRideOffers += `</ul>`;
    setRideOffer.style.display = 'none';
    showOffers.style.display = 'block';
    searchBy.style.display = 'block';
    paginate.style.display = 'block';
    showOffers.innerHTML = listOfRideOffers;
  }

  showRideoffers();
}