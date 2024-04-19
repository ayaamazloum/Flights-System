<?php
include('connection.php');


$coinRequestID=$_POST['coinRequest_id'];
$requestedValue=$_POST['requestedValue'];
$status=$_POST['status'];
$done=1;



$query = $mysqli->prepare(
    "UPDATE `coin-requests` 
    SET   `coin-requests`.`status`=?
    where id=?");
$query->bind_param("ii",$done,$coinRequestID);
$query->execute();


if($status==1){
$query2 = $mysqli->prepare(
    "UPDATE users 
    SET balance = balance + ?
    WHERE id IN (
        SELECT `coin-requests`.user_id 
        FROM `coin-requests` 
        WHERE id = ?
    );
    ");
$query2->bind_param("ii", $requestedValue, $coinRequestID);

if($query2->execute() ){
    $response["status"] = "Balance Updated Successfully";
}else{
    $response["status"] = "Failed";
}

}else{

if($query->execute() ){
    $response["status"] = "Updated Successfully";
}else{
    $response["status"] = "Failed";
}
}
echo json_encode($response);
