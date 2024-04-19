<?php
include('connection.php');

$query = "
    SELECT 
        flights.id,
        flights.departure_date,
        flights.return_date,
        flights.departure_time,
        flights.arrival_time,
        flights.number_of_passengers,
        flights.price,
        flights.status,
        departure_airport.name AS departure_airport_name,
        departure_airport.country AS departure_airport_country,
        arrival_airport.name AS arrival_airport_name,
        arrival_airport.country AS arrival_airport_country
    FROM 
        flights
    INNER JOIN 
        airports AS departure_airport ON flights.departure_airport_id = departure_airport.id
    INNER JOIN 
        airports AS arrival_airport ON flights.arrival_airport_id = arrival_airport.id
";

$result = $mysqli->query($query);

if ($result) {
    $flightDetails = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($flightDetails);
} else {
    echo json_encode(['error' => 'Flight details not found']);
}
?>
