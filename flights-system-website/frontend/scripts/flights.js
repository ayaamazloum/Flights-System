const flightsContainer = document.getElementById('flights-container');
const departureCountrySelect = document.getElementById('departure-country');
const arrivalCountrySelect = document.getElementById('destination-country');
const departureDateInput = document.getElementById('departure-date');
const returnDateInput = document.getElementById('return-date');
const numPassengersInput = document.getElementById('num-passengers');
const searchBtn = document.getElementById('search-btn');
const noFlights = document.getElementById('no-flights');



const getAllFlights = () => {
    fetch("http://localhost/flights-system-website/backend/read_flights.php", {
      method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        displayFlights(data);
        fillCountrySelects(data);
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
            window.location.href = "../pages/bookingflight.html";
        });
    });
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
    
    const uniqueDepartureCountries = [...new Set(departureCountries.map(country => JSON.stringify(country)))].map(str => JSON.parse(str));
    const uniqueArrivalCountries = [...new Set(arrivalCountries.map(country => JSON.stringify(country)))].map(str => JSON.parse(str));

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
                        <img src="../assets/icons/double-arrow.svg" />
                        <div class="destination flex column center">
                            <p class="date">${f_return_date}</p>
                            <p class="time">${arrival_time}</p>
                        </div>
                    </div>
                
                    <div class="departure-destination">
                        <h3>${departure_country} - ${arrival_country}</h3>
                    </div>
                    
                    <div class="passengers flex row">
                        <img src="../assets/icons/passenger-gray.svg" /> ${num_passengers} Passenger${num_passengers>1 ? 's' : ''}
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

const filterFlights = async () => {
    try {
        const formData = new FormData();

        const filterOptions = localStorage.getItem('flightsFilterOptions');

        if (filterOptions) {
            const { departureCountryId, arrivalCountryId, departureDate, returnDate, numPassengers } = JSON.parse(filterOptions);
            if (departureCountryId !== 'any') formData.append('departureCountryId', departureCountryId);
            if (arrivalCountryId !== 'any') formData.append('arrivalCountryId', arrivalCountryId);
            if (departureDate) formData.append('departureDate', departureDate);
            if (returnDate) formData.append('returnDate', returnDate);
            formData.append('numPassengers', numPassengers);
            localStorage.removeItem('flightsFilterOptions');
        } else {
            const departureCountryId = departureCountrySelect.value;
            const arrivalCountryId = arrivalCountrySelect.value;
            const departureDate = departureDateInput.value;
            const returnDate = returnDateInput.value;
            const numPassengers = numPassengersInput.value == '' ? 0 : numPassengersInput.value;


            if (departureCountryId !== 'any') formData.append('departureCountryId', departureCountryId);
            if (arrivalCountryId !== 'any') formData.append('arrivalCountryId', arrivalCountryId);
            if (departureDate) formData.append('departureDate', departureDate);
            if (returnDate) formData.append('returnDate', returnDate);
            formData.append('numPassengers', numPassengers);
        }

        const response = await axios.post('http://localhost/flights-system-website/backend/read_flights.php', formData);

        displayFlights(response.data);

      } catch (e) {
        console.error(e);
      }
};




searchBtn.addEventListener('click', () => filterFlights());

localStorage.getItem('flightsFilterOptions') ? filterFlights() : getAllFlights();