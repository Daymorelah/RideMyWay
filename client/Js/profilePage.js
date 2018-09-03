
const navMenu = document.getElementById('nav-menu');
const topNav = document.getElementById('nav-top-nav');
const ridesGiven = document.getElementById('rides-given');
const ridesTaken = document.getElementById('rides-taken');
const userImage = document.querySelector('#user-image h3');
const listRidesTaken = document.getElementById('list-rides-taken');
const listRidesGiven = document.getElementById('list-rides-given');

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
const noRidesYet = (which) => {
  const divTag = document.createElement('div');
  divTag.setAttribute('class', 'no-rides-yet');
  divTag.innerHTML = `No rides ${which} yet`;
  return divTag;
};
const getUSername = (username) => {
  userImage.textContent = `Hello! ${username}`;
};
const generateRiderImage = () => {
  const divTag = document.createElement('div');
  divTag.setAttribute('class', 'driver-image');
  divTag.innerHTML = '<img src="../images/download2.png" alt="driver\'s-pic">';
  return divTag;
};
const generateRideDetails = (ride) => {
  const rideDetails = document.createElement('div');
  const source = document.createElement('p');
  const destination = document.createElement('p');
  const driver = document.createElement('p');
  const time = document.createElement('p');
  driver.insertAdjacentHTML('beforeend', '<span class="column">Driver: </span>');
  driver.insertAdjacentHTML('beforeend', `<span>${ride.driver}</span>`);
  rideDetails.appendChild(driver);
  source.insertAdjacentHTML('beforeend', '<span class="column">Source:  </span>');
  source.insertAdjacentHTML('beforeend', `<span>${ride.source}</span>`);
  rideDetails.appendChild(source);
  destination.insertAdjacentHTML('beforeend', '<span class="column">Destination: </span>');
  destination.insertAdjacentHTML('beforeend', `<span>${ride.destination}</span>`);
  rideDetails.appendChild(destination);
  time.insertAdjacentHTML('beforeend', '<span class="column">Time: </span>');
  time.insertAdjacentHTML('beforeend', `<span>${ride.time}</span>`);
  rideDetails.appendChild(time);
  rideDetails.setAttribute('class', 'ride-details');
  return rideDetails;
};

const loadRidesGiven = () => {
  fetch('http://localhost:2033/api/v1/rides/users/offers', {
    method: 'GET',
    headers: {
      'x-access-token': `${localStorage.getItem('token')}`,
    },
  }).then(res => res.json()).then((res) => {
    if (res.status === 'success') {
      const oldUl = document.querySelector('#list-rides-given ul');
      const ulTag = document.createElement('ul');
      ridesGiven.textContent = res.data.numberOfRides ? res.data.numberOfRides : 0;
      getUSername(res.data.username);
      if (res.data.rideOffers) {
        res.data.rideOffers.forEach((ride) => {
          const liTag = document.createElement('li');
          liTag.setAttribute('class', 'rides');
          liTag.appendChild(generateRiderImage());
          liTag.appendChild(generateRideDetails(ride));
          ulTag.appendChild(liTag);
        });
        listRidesGiven.replaceChild(ulTag, oldUl);
      } else {
        listRidesGiven.style.minHeight = 0;
        listRidesGiven.replaceChild(noRidesYet('given'), oldUl);
      }
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
      const oldUl = document.querySelector('#list-rides-taken ul');
      const ulTag = document.createElement('ul');
      ridesTaken.textContent = res.data.numberOfRides ? res.data.numberOfRides : 0;
      if (res.data.rideOffers) {
        res.data.rideOffers.forEach((ride) => {
          const liTag = document.createElement('li');
          liTag.setAttribute('class', 'rides');
          liTag.appendChild(generateRiderImage());
          liTag.appendChild(generateRideDetails(ride));
          ulTag.appendChild(liTag);
        });
        document.querySelector('#list-rides-taken ul').remove();
        listRidesTaken.replaceChild(ulTag, oldUl);
      } else {
        listRidesTaken.style.minHeight = 0;
        listRidesTaken.replaceChild(noRidesYet('taken'), oldUl);
      }
    }
  });
};

window.onload = () => loadRidesGiven(); loadRidesTaken();
