
const navMenu = document.getElementById('nav-menu');
const topNav = document.getElementById('nav-top-nav');
const rideOfferContainer = document.getElementById('ride-offer-container');
const closeModal = document.getElementById('close');
const modalButton = document.getElementById('modal-button');
const rideDetailModal = document.getElementById('ride-details-modal');
const modalDriver = document.getElementById('modal-driver');
const modalJourney = document.getElementById('modal-journey');
const modalSeats = document.getElementById('modal-seats');
const modalPrice = document.getElementById('modal-price');
const modalPassenger = document.getElementById('modal-passengers');
const modalTime = document.getElementById('modal-time');

// toggle navigation on small width devices
navMenu.addEventListener('click', () => {
  if (topNav.classList) {
    topNav.classList.toggle('open');
  } else {
    // For IE9
    const arrayOfClasses = topNav.className.split(' ');
    const openClassIndex = arrayOfClasses.indexOf('open');
    if (openClassIndex >= 0) arrayOfClasses.splice(openClassIndex, 1);
    else {
      arrayOfClasses.push('open');
      topNav.className = arrayOfClasses.join(' ');
    }
  }
});
const showListOfRides = (ride) => {
  const result = document.createElement('div');
  const driver = document.createElement('h3');
  const journey = document.createElement('p');
  const seats = document.createElement('p');
  const priceNdetail = document.createElement('div');
  const price = document.createElement('h3');
  const details = document.createElement('button');
  result.className = 'ride-offer';
  driver.className = 'driver';
  journey.className = 'journey';
  seats.className = 'seats';
  priceNdetail.className = 'price-n-detail';
  price.className = 'price';
  details.className = 'details';
  driver.textContent = `${ride.driver}`;
  journey.textContent = `From ${ride.source} to ${ride.destination}`;
  seats.textContent = `Number of seats: ${ride.numberofseats}`;
  price.textContent = '₦350';
  details.textContent = 'View Details';
  priceNdetail.appendChild(price);
  priceNdetail.appendChild(details);
  result.appendChild(driver);
  result.appendChild(journey);
  result.appendChild(seats);
  result.appendChild(priceNdetail);
  result.setAttribute('rideId', `${ride.id}`);
  rideOfferContainer.appendChild(result);
};
const showModal = (event, res) => {
  const rideId = parseInt(event.target.parentElement.parentElement.getAttribute('rideId'), 10);
  const ride = res.data.rideOffers.find(rideOffer => rideOffer.id === rideId);
  modalDriver.textContent = `${ride.driver}`;
  modalJourney.textContent = `From ${ride.source} to ${ride.destination}`;
  modalSeats.textContent = `Number of seats: ${ride.numberofseats}`;
  modalPrice.textContent = 'Price: ₦350';
  modalTime.textContent = `Time: ${ride.time}`;
  if (!ride.passengers.length) modalPassenger.textContent = 'No passengers yet';
  else {
    modalPassenger.textContent = '';
    ride.passengers.forEach(passenger => modalPassenger.insertAdjacentHTML('afterbegin', `<li>${passenger}</li>`));
  }
  rideDetailModal.style.display = 'block';
};
const loadContent = () => {
  fetch('/api/v1/rides', {
    method: 'GET',
    headers: {
      'x-access-token': `${localStorage.getItem('token')}`,
    },
  }).then(res => res.json()).then((res) => {
    if (res.status === 'success') {
      rideOfferContainer.innerHTML = '';
      res.data.rideOffers.forEach(showListOfRides);
      const rideDetails = document.querySelectorAll('.details');
      rideDetails.forEach((detail) => {
        detail.addEventListener('click', event => showModal(event, res));
      });
      closeModal.onclick = () => {
        rideDetailModal.style.display = 'none';
      };
      modalButton.onclick = () => {
        rideDetailModal.style.display = 'none';
      };
    }
  });
};

window.onload = loadContent();

window.onclick = (event) => {
  if (event.target === rideDetailModal) {
    rideDetailModal.style.display = 'none';
  }
};
