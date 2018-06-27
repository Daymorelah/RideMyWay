window.onload = () => {
  
  let gridItemTwo = document.getElementById("ask-user");
  let searchBy = document.getElementById("search-by");
  let paginate = document.getElementById("paginate");

  document.getElementById("rides-taken").addEventListener('click', showRidesTaken);
  document.getElementById("rides-given").addEventListener('click', showRidesGiven);

  function showRidesGiven() {
    searchBy.style.display = "block";
    paginate.style.display = "block";
    let listOfRidesGiven = `<div><ul>` ;
    for(let i = 0; i < 4; i++) {
      listOfRidesGiven += `<li> <img src="../images/download2.png"/>Destination: Surulere`
      +`<br/> Origin: Victoria Island <br/> Time: 7:00 AM</li>`;
    }
    listOfRidesGiven += `</ul></div>`;
    gridItemTwo.style.padding = "0px";
    gridItemTwo.innerHTML = listOfRidesGiven;
  }
  
  function showRidesTaken() {
    searchBy.style.display = "block";
    paginate.style.display = "block";
    let listOfRidesTaken = `<div><ul>` ;
    for(let i = 0; i < 4; i++) {
      listOfRidesTaken += `<li> <img src="../images/download2.png" />Destination: Sabo, `  
      + `Yaba <br/> Origin: Opebi, Ikeja <br/> Time: 7:00 AM</li>`;
    }
    listOfRidesTaken += `</ul></div>`;
    gridItemTwo.style.padding = "0px";
    gridItemTwo.innerHTML = listOfRidesTaken;
  }
} //end of widow.onlaod