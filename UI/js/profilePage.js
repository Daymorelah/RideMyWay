/* eslint-disable no-undef */
window.onload = () => {
  let isVisible = 0;
  let navMenu = document.getElementById('nav-menu');
  let topNav = document.getElementById('nav-top-nav');
  
  navMenu.addEventListener('click', () => {
    if (isVisible) {
      topNav.setAttribute('class', '');
      isVisible = 0;
     } else {  
      topNav.setAttribute('class', 'open')
      isVisible = 1;
    }
  });
  
  function showRidesGiven() {
    searchBy.style.display = 'block';
    paginate.style.display = 'block';
    let listOfRidesGiven = '<div><ul>';
    for (let i = 0; i < 4; i += 1) {
      listOfRidesGiven += '<li> <img src="../images/download2.png"/>Destination: Surulere'
      + '<br/> Origin: Victoria Island <br/> Time: 7:00 AM</li>';
    }
    listOfRidesGiven += '</ul></div>';
    gridItemTwo.style.padding = '0px';
    gridItemTwo.innerHTML = listOfRidesGiven;
  }

  function showRidesTaken() {
    searchBy.style.display = 'block';
    paginate.style.display = 'block';
    let listOfRidesTaken = '<div><ul>';
    for (let i = 0; i < 4; i += 1) {
      listOfRidesTaken += '<li> <img src="../images/download2.png" />Destination: Sabo, '
      + 'Yaba <br/> Origin: Opebi, Ikeja <br/> Time: 7:00 AM</li>';
    }
    listOfRidesTaken += '</ul></div>';
    gridItemTwo.style.padding = '0px';
    gridItemTwo.innerHTML = listOfRidesTaken;
  }
  document.getElementById('rides-taken').addEventListener('click', showRidesTaken);
  document.getElementById('rides-given').addEventListener('click', showRidesGiven);
}; // end of widow.onlaod
