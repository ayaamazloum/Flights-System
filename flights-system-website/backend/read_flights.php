<?php
include('connection.php');

$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        $response = getAllFlights();
        echo json_encode($response);
        break;
    case 'POST':
        $response = filterFlights();
        echo json_encode($response);
        break;
    default:
        echo json_encode(["status"=>"something went wrong",]);
        break;
}




function filterFlights() {
    global $mysqli;

    $query_text = "SELECT * FROM(
                    SELECT f.id, f.departure_date, f.return_date, f.departure_time, f.arrival_time, 
                    f.number_of_passengers, f.price, f.status, f.image, da.country AS departure_country, 
                    da.id AS departure_airport_id, aa.country AS arrival_country, aa.id AS arrival_airport_id, f.airline_id
                    FROM flights f
                    JOIN airports da ON f.departure_airport_id = da.id
                    JOIN airports aa ON f.arrival_airport_id = aa.id";

    $where_clause = " WHERE departure_airport_id = da.id AND f.arrival_airport_id = aa.id and f.status = 'scheduled'";
    $bind_type = '';
    $bind_parameters = [];

    if(isset($_POST['departureCountryId'])) {
        $departure_airport_id = $_POST['departureCountryId'];
        $where_clause .= " AND departure_airport_id = ?";
        $bind_type .= 'i';
        $bind_parameters[] = intval($departure_airport_id);
    }

    if(isset($_POST['arrivalCountryId'])) {
        $arrival_airport_id = $_POST['arrivalCountryId'];
        $where_clause .= " AND arrival_airport_id = ?";
        $bind_type .= 'i';
        $bind_parameters[] = intval($arrival_airport_id);
    }
    
    if(isset($_POST['departureDate'])) {
        $departure_date = $_POST['departureDate'];
        $where_clause .= " AND departure_date = ?";
        $bind_type .= 's';
        $bind_parameters[] = $departure_date;
    }
    
    if(isset($_POST['returnDate'])) {
        $return_date = $_POST['returnDate'];
        $where_clause .= " AND return_date = ?";
        $bind_type .= 's';
        $bind_parameters[] = $return_date;
    }
    
    if(isset($_POST['numPassengers'])) {
        $number_of_passengers = $_POST['numPassengers'];
        $where_clause .= " AND number_of_seats - number_of_passengers >= ?";
        $bind_type .= 'i';
        $bind_parameters[] = intval($number_of_passengers);
    }

    $query_text = $query_text . $where_clause . ") AS flight_info
                        JOIN (SELECT airline_id, AVG(rating) average_rating FROM ratings GROUP BY airline_id) AS airline_rating
                        ON flight_info.airline_id = airline_rating.airline_id";

    if(isset($_POST['topFlights']))
        $query_text .= " ORDER BY average_rating DESC LIMIT 8";

    $query = $mysqli->prepare($query_text);
    if(!empty($bind_parameters))  $query->bind_param($bind_type, ...$bind_parameters);
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows();

    if($num_rows == 0) {
        $response["status"] = "No flights";
    }else{
        $flights = [];
        $query->bind_result($id, $departure_date, $return_date, $departure_time, $arrival_time, 
                                $num_passengers, $price, $status, $image, $departure_country, $departure_airport_id, 
                                $arrival_country, $arrival_airport_id, $airline_id, $airline_id_extra, $average_rating);
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
                'departure_country' => $departure_country,
                'arrival_country' => $arrival_country,
                'departure_airport_id' => $departure_airport_id,
                'arrival_airport_id' => $arrival_airport_id,
                'airline_id' => $airline_id,
                'average_rating' => $average_rating
            ];

            $flights[] = $flight;
        }

        $response["status"] = "Success";
        $response["flights"] = $flights;
    }
    return $response;
}




function getAllFlights(){
    global $mysqli;

    $query = $mysqli->prepare("SELECT * FROM(
                SELECT f.id, f.departure_date, f.return_date, f.departure_time, f.arrival_time, 
                f.number_of_passengers, f.price, f.status, f.image, da.country AS departure_country, 
                da.id AS departure_airport_id, aa.country AS arrival_country, aa.id AS arrival_airport_id, f.airline_id
                FROM flights f
                JOIN airports da ON f.departure_airport_id = da.id
                JOIN airports aa ON f.arrival_airport_id = aa.id
                WHERE departure_airport_id = da.id AND f.arrival_airport_id = aa.id and f.status = 'scheduled') AS flight_info
            JOIN (SELECT airline_id, AVG(rating) average_rating FROM ratings GROUP BY airline_id) AS airline_rating
            ON flight_info.airline_id = airline_rating.airline_id");
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows();

    if($num_rows == 0) {
        $response["status"] = "No flights";
    } else {
        $flights = [];
        $query->bind_result($id, $departure_date, $return_date, $departure_time, $arrival_time, 
                                $num_passengers, $price, $status, $image, $departure_country, $departure_airport_id, 
                                $arrival_country, $arrival_airport_id, $airline_id, $airline_id_extra, $average_rating);
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
                'departure_country' => $departure_country,
                'arrival_country' => $arrival_country,
                'departure_airport_id' => $departure_airport_id,
                'arrival_airport_id' => $arrival_airport_id,
                'airline_id' => $airline_id,
                'average_rating' => $average_rating
            ];

            $flights[] = $flight;
        }

        $response["status"] = "Success";
        $response["flights"] = $flights;
    }
    return $response;
}
