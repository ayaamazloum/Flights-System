<?php
include('connection.php');

$query=$mysqli->prepare("SELECT COUNT(*) AS totalBookings FROM bookings");
$query->execute();
$query->bind_result($totalBookings);
$query->fetch();
if($totalBookings ==0){
    $response["status"] = "No Bookings Found";
}else{
    $response["status"] = "Bookings Found";
    $response["result"] =  $totalBookings;
}
echo json_encode($response);