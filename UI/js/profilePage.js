window.onload = () => {
  
  let gridItemTwo = document.getElementById("grid-item-2");

  document.getElementById("rides-taken").addEventListener('click', showRidesTaken);
  document.getElementById("rides-given").addEventListener('click', showRidesGiven);

  function showRidesGiven() {
    let listOfRidesGiven = `<ul>` ;
    for(let i = 0; i < 5; i++) {
      listOfRidesGiven += `<li> <img src="../images/download2.png"/>Destination: Surulere`
      +`<br/> Origin: Victoria Island <br/> Time: 7:00 AM</li>`;
    }
    listOfRidesGiven += `</ul>`;
    gridItemTwo.innerHTML = listOfRidesGiven;
  }
  
  function showRidesTaken() {
    let listOfRidesTaken = `<ul>` ;
    for(let i = 0; i < 5; i++) {
      listOfRidesTaken += `<li> <img src="../images/download2.png" />Destination: Sabo, `  
      + `Yaba <br/> Origin: Opebi, Ikeja <br/> Time: 7:00 AM</li>`;
    }
    listOfRidesTaken += `</ul>`;
    gridItemTwo.innerHTML = listOfRidesTaken;
  }
} //end of widow.onlaod