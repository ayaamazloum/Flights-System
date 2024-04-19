<?php
include('connection.php');


$bookinID=$_POST['booking_id'];

$query = $mysqli->prepare("DELETE from bookings where id=?");
$query->bind_param("i", $bookinID);


if($query->execute()){
    $response["status"] = "Deleted Successfully";
}else{
    $response["status"] = "Failed";
}

echo json_encode($response);