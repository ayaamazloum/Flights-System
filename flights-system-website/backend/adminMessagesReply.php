<?php
include('connection.php');


$messageID=$_POST['message_id'];
$adminResponse=$_POST['adminResponse'];
$done=1;

$query = $mysqli->prepare(
    "UPDATE messages 
    SET response = ?, `status`=? 
    where id=?");
$query->bind_param("sii", $adminResponse, $done,$messageID);


if($query->execute()){
    $response["status"] = "Updated Successfully";
}else{
    $response["status"] = "Failed";
}

echo json_encode($response);