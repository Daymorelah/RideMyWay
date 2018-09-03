
const navMenu = document.getElementById('nav-menu');
const topNav = document.getElementById('nav-top-nav');
const ridesGiven = document.getElementById('rides-given');
const ridesTaken = document.getElementById('rides-taken');

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

const loadRidesGiven = () => {
  fetch('http://localhost:2033/api/v1/rides/users/offers', {
    method: 'GET',
    headers: {
      'x-access-token': `${localStorage.getItem('token')}`,
    },
  }).then(res => res.json()).then((res) => {
    if (res.status === 'success') {
      ridesGiven.textContent = res.data.numberOfRides ? res.data.numberOfRides : 0;
      res.data.rideOffers.forEach(showRides);
    }
  });
};

const loadRidesTaken = () => {
  fetch('http://localhost:2033/api/v1/rides/users', {
    method: 'GET',
    headers: {
      'x-access-token': `${localStorage.getItem('token')}`,
    },
  }).then(res => res.json()).then((res) => {
    if (res.status === 'success') {
      ridesTaken.textContent = res.data.numberOfRides ? res.data.numberOfRides : 0;
      res.data.rideOffers.forEach(showRides);
    }
  });
};

window.onload = () => loadRidesGiven(); loadRidesTaken();
