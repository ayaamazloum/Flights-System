
const departureCountrySelect = document.getElementById('departure-country');
const arrivalCountrySelect = document.getElementById('destination-country');
const departureDateInput = document.getElementById('departure-date');
const returnDateInput = document.getElementById('return-date');
const numPassengersInput = document.getElementById('num-passengers');
const searchBtn = document.getElementById('search-btn');
const topFlightsContainer = document.getElementById('top-flights-container');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');
const openNavBtn = document.getElementById('open-nav-btn');
const closeNavBtn = document.getElementById('close-nav-btn');
const navLinks = document.getElementById('nav-links');
const logoutBtn = document.getElementById('logout-btn');



const getAllFlights = () => {
    fetch("http://localhost/flights-system-website/backend/read_flights.php", {
      method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        fillCountrySelects(data);
    })
    .catch((error) => {
        console.error(error);
    });
};

const getTopFlights = async () => {
    try {
        const formData = new FormData();
        formData.append('topFlights', 'yes');

        const response = await axios.post('http://localhost/flights-system-website/backend/read_flights.php', formData);

        displayTopFlights(response.data);
      } catch (e) {
        console.error(e);
      }
};

const fillCountrySelects = ({flights}) => {
    const departureCountries = [];
    const arrivalCountries = [];

    flights?.forEach(flight => {
        departureCountries.push(
            {
                'id': flight.departure_airport_id,
                'name': flight.departure_country
            });
            arrivalCountries.push(
            {
                'id': flight.arrival_airport_id,
                'name': flight.arrival_country
            });
    });
    
    const uniqueDepartureCountries = [...new Set(departureCountries.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
    const uniqueArrivalCountries = [...new Set(arrivalCountries.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));

    uniqueDepartureCountries.forEach(country => {
        departureCountrySelect.innerHTML += `<option value="${country.id}">${country.name}</option>`;
    });
    uniqueArrivalCountries.forEach(country => {
        arrivalCountrySelect.innerHTML += `<option value="${country.id}">${country.name}</option>`;
    });
};

const formatDateToDisplay = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      throw new Error("Invalid date string format. Please use YYYY-MM-DD.");
    }
  
    const date = new Date(dateString);
  
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return formattedDate;
}

const displayTopFlights = (data) => {
    data.flights?.forEach((flight) => {
        const flightCard = generateFlightCard(flight);
        topFlightsContainer.innerHTML += flightCard;

        const stars = document.querySelectorAll('.fa-star')
        
        const rating = Math.round(parseFloat(flight['average_rating']));
        for (let i = 0; i < stars.length; i++) {
            if (i < rating)
                stars[i].classList.add('glow')
            else
                break;
        }
    });

    const bookBtns = document.querySelectorAll('.book-btn');
    bookBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const flightId = btn.parentElement.id;
            localStorage.setItem('flightId', flightId);
            window.location.href = "./pages/bookingflight.html";
        });
    });
};

const generateFlightCard = (flight) => {
    const { id, departure_date, return_date, departure_time, arrival_time, num_passengers, price, image, departure_country, arrival_country } = flight;
    
    const f_departure_date = formatDateToDisplay(departure_date, "MMM Do, YYYY");
    const f_return_date = formatDateToDisplay(return_date, "MMM Do, YYYY");

    return `<div class="flight-card" id="${id}">
                <img src="../../backend/${image}" />
                <div class="flight-info flex column center">
                    <div class="date-time white-text flex row center gap-10">
                        <div class="departure flex column center">
                            <p class="date">${f_departure_date}</p>
                            <p class="time">${departure_time}</p>
                        </div>
                        <img src="./assets/icons/double-arrow.svg" />
                        <div class="destination flex column center">
                            <p class="date">${f_return_date}</p>
                            <p class="time">${arrival_time}</p>
                        </div>
                    </div>
                
                    <div class="departure-destination">
                        <h3>${departure_country} - ${arrival_country}</h3>
                    </div>
                    
                    <div class="passengers flex row">
                        <img src="./assets/icons/passenger-gray.svg" /> ${num_passengers} Passenger${num_passengers>1 ? 's' : ''}
                    </div>

                    <div>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>
                </div>

                <h3 class="price">${price}$</h3>
                <btn class="book book-btn btn-style-3">Book now</btn>
            </div>`;
};

const sendMessage = () => {
    const message = messageInput.value;
    if (message === '')
        return;

    const userId = parseInt(localStorage.getItem('loggedUser'));

    const formData = new FormData();
    formData.append('text', messageInput.value);
    formData.append('user_id',userId);

    fetch("http://localhost/flights-system-website/backend/send_message.php", {
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        messageInput.value = '';
        messageInput.placeholder = 'message sent successfully!';
    })
    .catch((error) => {
        console.error(error);
    });
};




searchBtn.addEventListener('click', () => {
    const departureCountryId = departureCountrySelect.value;
    const arrivalCountryId = arrivalCountrySelect.value;
    const departureDate = departureDateInput.value;
    const returnDate = returnDateInput.value;
    const numPassengers = numPassengersInput.value == '' ? 0 : numPassengersInput.value;

    const flightsFilterOptions = {
        departureCountryId: departureCountryId,
        arrivalCountryId: arrivalCountryId,
        departureDate: departureDate,
        returnDate: returnDate,
        numPassengers: numPassengers
    };

    localStorage.setItem('flightsFilterOptions', JSON.stringify(flightsFilterOptions));

    window.location.href = "./pages/flights.html";
});

sendBtn.addEventListener('click', () => { sendMessage(); });

openNavBtn.addEventListener('click', () => {
    openNavBtn.style.display = 'none';
    closeNavBtn.style.display = 'block';
    navLinks.style.display = 'flex';
});

closeNavBtn.addEventListener('click', () => {
    openNavBtn.style.display = 'block';
    closeNavBtn.style.display = 'none';
    navLinks.style.display = 'none';
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedUser');
    window.location.href = './login.html';
});

 if (!localStorage.getItem('loggedUser'))
     window.location.href = './pages/login.html';


getAllFlights();
getTopFlights();