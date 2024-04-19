<?php
include('connection.php');

$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        $response = getAllFlights();
        echo json_encode($response);
        break;
    case 'POST':
        $response = addFlight();
        echo json_encode($response);
        break;
    default:
        echo json_encode(["status"=>"something went wrong",]);
        break;
}

function addFlight() {}

function getAllFlights(){
    global $mysqli;

    $query = $mysqli->prepare("SELECT f.id, f.departure_date, f.return_date, f.departure_time, f.arrival_time, 
                f.number_of_passengers, f.price, f.status, f.image, da.name AS departure_airport, 
                aa.name AS arrival_airport, p.manufacturer, p.model, l.name
                FROM flights f
                JOIN airports da ON f.departure_airport_id = da.id
                JOIN airports aa ON f.arrival_airport_id = aa.id
                JOIN planes p ON f.plane_id = p.id
                JOIN airlines l ON f.airline_id = l.id
                WHERE departure_airport_id = da.id AND f.arrival_airport_id = aa.id");
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows();

    if($num_rows == 0) {
        $response["status"] = "No flights";
    } else {
        $flights = [];
        $query->bind_result($id, $departure_date, $return_date, $departure_time, $arrival_time, 
                                $num_passengers, $price, $status, $image, $departure_airport, 
                                $arrival_airport, $plane_manufacturer, $plane_model, $airline);
        while($query->fetch()){
            $flight = [
                'id' => $id,
                'departure_date' => $departure_date,
                'return_date' => $return_date,
                'departure_time' => $departure_time,
                'arrival_time' => $arrival_time,
                'num_passengers' => $num_passengers,
                'price' => $price,
                'status' => $status,
                'image' => $image,
                'departure_airport' => $departure_airport,
                'arrival_airport' => $arrival_airport,
                'plane_manufacturer' => $plane_manufacturer,
                'plane_model' => $plane_model,
                'airline' => $airline
            ];

            $flights[] = $flight;
        }

        $response["status"] = "Success";
        $response["flights"] = $flights;
    }
    return $response;
}
