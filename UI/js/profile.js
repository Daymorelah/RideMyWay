window.onload = () => {
  
  let gridItemTwo = document.getElementsByClassName("grid-item-2");

  document.getElementById("rides-taken").addEventListener('click', showRidesTaken);
  document.getElementById("rides-given").addEventListener('click', showRidesGiven);

  function showRidesGiven() {
    let listOfRidesGiven = `<ul id="rides-given">` ;
    for(let i = 0; i < 7; i++) {
      listOfRidesGiven += `<li> <img src="../images/download2.png">Destination: Surulere`
      +`<br/> Origin: Victoria Island <br/> Time: 7:00 AM</li>`;
    }
    listOfRidesGiven += `</ul>`;
    gridItemTwo[0].innerHTML = listOfRidesGiven;
  }
  
  function showRidesTaken() {
    let listOfRidesTaken = `<ul id="rides-given">` ;
    for(let i = 0; i < 7; i++) {
      listOfRidesTaken += `<li> <img src="../images/download2.png">Destination: Sabo, `  
      + `Yaba <br/> Origin: Opebi, Ikeja <br/> Time: 7:00 AM</li>`;
    }
    listOfRidesTaken += `</ul>`;
    gridItemTwo[0].innerHTML = listOfRidesTaken;
  }
} //end of widow.onlaod