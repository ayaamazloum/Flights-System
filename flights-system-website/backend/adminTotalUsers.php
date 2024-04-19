<?php
include('connection.php');

$query=$mysqli->prepare("SELECT COUNT(*) AS users FROM users");
$query->execute();
$query->bind_result($numUsers);
$query->fetch();
if($numUsers ==0){
    $response["status"] = "No Users Found";
}else{
    $response["status"] = "Users Found" ;
    $response["result"] =  $numUsers;
}
echo json_encode($response);