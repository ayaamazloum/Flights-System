const selectorDepartureAirports = document.getElementById("departureSelect");
const selectorArrivalAirports = document.getElementById("arrivalSelect");
const selectorPlanes = document.getElementById("planeSelect");
const flightsContainer = document.getElementById("viewFlightsContainer");
const noFlights = document.getElementById("no-flights");
const popup = document.getElementById("popup");
const showhidden = document.getElementById("showhidden");
showhidden.addEventListener("click", () => {
  popup.classList.remove("hidden");
})




const getAllFlights = () => {
  fetch("http://localhost/flights-system-website/backend/adminFlights.php", {
    method: "GET",
  })
  .then((response) => {
      return response.json();
  })
  .then((data) => {
      displayFlights(data);
  })
  .catch((error) => {
      console.error(error);
  });
};

const displayFlights = (data) => {
  noFlights.classList.add('hidden');

  if (data.status === 'No flights')
      noFlights.classList.remove('hidden');
      
  flightsContainer.innerHTML = '';

  data.flights?.forEach((flight) => {
      const flightCard = generateFlightCard(flight);
      flightsContainer.innerHTML += flightCard;
  });

  const cancelBtns = document.querySelectorAll('.cancelFlight');
  cancelBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
          const flightId = parseInt(btn.parentElement.id);
          cancelFlight(flightId);
      });
  });
};


const generateFlightCard = (flight) => {
  const { id, departure_date, return_date, departure_time, arrival_time, num_passengers, price,
    status, image, departure_airport, arrival_airport, plane_manufacturer, plane_model, airline } = flight;

  return `<div class="viewFlightCard flex column"">
            <div class="card-details flex row">
              <p>Departure date:</p>
              <p>${departure_date}</p>
            </div>
            <div class="card-details flex row">
              <p>Return date:</p>
              <p>${return_date}</p>
            </div>
            <div class="card-details flex row">
              <p>Departure time:</p>
              <p>${departure_time}</p>
            </div>
            <div class="card-details flex row">
              <p>Arrival time:</p>
              <p>${arrival_time}</p>
            </div>
            <div class="card-details flex row">
              <p>Number of passengers:</p>
              <p>${num_passengers}</p>
            </div>
            <div class="card-details flex row">
              <p>Status:</p>
              <p>${status}</p>
            </div>
            <div class="card-details flex row">
              <p>Departure air-port:</p>
              <p>${departure_airport}</p>
            </div>
            <div class="card-details flex row">
              <p>Arrival air-port:</p>
              <p>${arrival_airport}</p>
            </div>
            <div class="card-details flex row">
              <p>Airlines:</p>
              <p>${airline}</p>
            </div>
            <div class="card-details flex row">
              <p>Plane:</p>
              <p>${plane_manufacturer} ${plane_model}</p>
            </div>
            <div class="card-details flex row">
              <p>Price:</p>
              <p>${price}$</p>
            </div>
            <div class="card-details flex row" id="${parseInt(id)}">
              <button class="adminBtn">Edit</button>
              <button class="adminBtn cancelFlight">Cancel Flight</button>
            </div>
          </div>`;
};


const cancelFlight = (id) => {
  const formData = new FormData();
  formData.append('id', id);

  fetch("http://localhost/flights-system-website/backend/cancelFlight.php", {
      method: "POST",
      body: formData
  })
  .then((response) => {
      return response.json();
  })
    .then((data) => {
      getAllFlights();
      console.log('flight is canceled');
  })
  .catch((error) => {
      console.error(error);
  });
};

const addOptionPlane = (text, id) => {
  let option = document.createElement("option");
  option.value = id;
  option.text = text;
  selectorPlanes.appendChild(option);
};

const addOptionAirport = (text, id) => {
    let departureOption = document.createElement("option");
    let arrivalOption = document.createElement("option");
    departureOption.value = id;
    departureOption.text = text;;
    arrivalOption.value = id;
    arrivalOption.text = text;
    selectorDepartureAirports.appendChild(departureOption);
    selectorArrivalAirports.appendChild(arrivalOption);
    
};

const GetPlane = () => {
  fetch(
    "http://localhost/flights-system-website/backend/adminGetPlanes.php",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const planes = data["planes"];
      planes.forEach(element => {
        const { id, manufacturer, model, airline } = element
        plane = manufacturer + " " + model + " owned by " + airline;
        addOptionPlane(plane, id)
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const GetAirport = () => {
    fetch(
      "http://localhost/flights-system-website/backend/adminGetAirport.php",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const airports = data["airports"];
        airports.forEach(element => {
            const {id,name}=element
            addOptionAirport(name,id)
        });
      })
      .catch((error) => {
        console.error(error);
      });
};
  

GetPlane();
GetAirport();
getAllFlights();


  if (!localStorage.getItem('isAdmin'))
    window.location.href = '../pages/login.html';