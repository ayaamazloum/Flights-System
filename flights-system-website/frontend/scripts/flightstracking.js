let flightsInfoContainer = document.getElementById("flightsInfoContainer");
const generateFlightsInfoCard = (flight) => {
  const {
    flight_id,
    departure_date,
    return_date,
    departure_time,
    arrival_time,
    status,
    departure_airport_name,
    departure_country,
    arrival_airport_name,
    arrival_country,
  } = flight;

  return `<tr>
                <td>${flight_id}</td>
                <td>${departure_airport_name},${departure_country}</td>
                <td>${arrival_airport_name},${arrival_country}</td>
                <td>${status}</td>
                <td>${departure_date},${departure_time}</td>
                <td>${return_date},${arrival_time}</td>
            </tr>`;
};

const getFlightInfo = () => {
  fetch("http://localhost/flights-system-website/backend/flightstracking.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const flights = data["flight"];
      flightsInfoContainer.innerHTML = "";
      flights.forEach((flight) => {
        flightsInfoContainer.innerHTML += generateFlightsInfoCard(flight);
      });
    });
};

getFlightInfo();
