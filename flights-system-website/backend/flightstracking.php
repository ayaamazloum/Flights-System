<?php
include('connection.php');

$query = $mysqli->prepare(
    "SELECT f.id AS flight_id, f.departure_date, f.return_date, f.departure_time, f.arrival_time, f.status,
             dep.name AS departure_airport_name, dep.country AS departure_country,
             arr.name AS arrival_airport_name, arr.country AS arrival_country
      FROM flights f
      INNER JOIN airports dep ON f.departure_airport_id = dep.id
      INNER JOIN airports arr ON f.arrival_airport_id = arr.id"
);

$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

$query->bind_result(
    $flight_id,
    $departure_date,
    $return_date,
    $departure_time,
    $arrival_time,
    $status,
    $departure_airport_name,
    $departure_country,
    $arrival_airport_name,
    $arrival_country
);

if ($num_rows == 0) {
    $response["status"] = "No Flights Found";
} else {
    $response["status"] = "Success";
    $flightsArray = [];
    while ($query->fetch()) {
        $flight = [
            "flight_id" => $flight_id,
            "departure_date" => $departure_date,
            "return_date" => $return_date,
            "departure_time" => $departure_time,
            "arrival_time" => $arrival_time,
            "status" => $status,
            "departure_airport_name" => $departure_airport_name,
            "departure_country" => $departure_country,
            "arrival_airport_name" => $arrival_airport_name,
            "arrival_country" => $arrival_country
        ];
        $flightsArray[] = $flight;
    }
    $response["flight"] = $flightsArray;
}

echo json_encode($response);
?>