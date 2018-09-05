// Code starts below
const navMenu = document.getElementById('nav-menu');
const topNav = document.getElementById('nav-top-nav');
const rideOfferForm = document.querySelector('form');
const createRideButton = document.querySelector('#create-ride');
const cancelRideButton = document.querySelector('#cancel-ride');
const footer = document.querySelector('#footer');
const ridecreatedSuccess = document.querySelector('#rideCreated-success-container');
const rideCreatedError = document.querySelector('#rideCreated-error-container');

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
const getRideDetails = () => {
  const rideDetails = {};
  for (let i = 0; i < rideOfferForm.children.length - 2; i += 1) {
    rideDetails[rideOfferForm.children[i].name] = rideOfferForm.children[i].value;
  }
  return rideDetails;
};
const createRide = () => {
  const rideDetail = getRideDetails();
  fetch(
    '/api/v1/users/rides',
    {
      method: 'POST',
      body: JSON.stringify(rideDetail),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${localStorage.getItem('token')}`,
      },
    },
  ).then(res => res.json()).then((res) => {
    if (res.status === 'success') {
      ridecreatedSuccess.style.display = 'block';
      rideOfferForm.style.display = 'none';
      rideCreatedError.style.display = 'none';
      footer.style.cssText = 'position:absolute; bottom:0';
      setTimeout(() => {
        window.location = '/client/Html/homePage.html';
      }, 2500);
    } else {
      ridecreatedSuccess.style.display = 'none';
      rideOfferForm.style.display = 'none';
      rideCreatedError.style.display = 'block';
      footer.style.cssText = 'position:absolute; bottom:0';
      rideCreatedError.insertAdjacentHTML('beforeend', `<p>${res.data.message}</P>`);
      setTimeout(() => {
        window.location.reload(1);
      }, 3500);
    }
  });
};
const cancelRide = () => {
  rideOfferForm.reset();
  setTimeout(() => {
    window.location = '/client/Html/homePage.html';
  }, 1000);
};

const init = () => {
  createRideButton.addEventListener('click', createRide);
  cancelRideButton.addEventListener('click', cancelRide);
};

window.onload = () => init();
