<?php
include('connection.php');

$query=$mysqli->prepare(
"SELECT f.id, f.departure_date, f.return_date, f.departure_time, f.arrival_time, users.name, users.email, users.phone_number, users.gender, bookings.amount_paid
FROM flights f
INNER JOIN bookings on f.id = bookings.flight_id
INNER JOIN users on users.id = bookings.user_id
");

$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

$query->bind_result($id, $departureDate, $returnDate, $departureTime, $arrivalTime, $name, $email, $phoneNumber, $gender ,$amountPaid);

if($num_rows==0){
    $response["status"] = "No Bookings Found";
}else{
    $response["status"] = "Success";
    $bookingss=[];
    while($query->fetch()){
        $booking= [
        "id" => $id,
        "departure_date"=>$departureDate,
        "return_date"=>$returnDate,
        "departure_time"=>$departureTime,
        "arrival_time"=>$arrivalTime,
        "name" => $name,
        "email" => $email,
        "phone_number" => $phoneNumber,
        "gender" => $gender,
       
    ];
    $bookings[]=$booking;
    }
    $response["bookings"] = $bookings;

}
echo json_encode($response);
