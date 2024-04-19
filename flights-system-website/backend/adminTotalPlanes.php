<?php
include('connection.php');

$query=$mysqli->prepare("SELECT COUNT(*) AS planes FROM planes");
$query->execute();
$query->bind_result($numPlanes);
$query->fetch();
if($numPlanes ==0){
    $response["status"] = "No Planes Found";
}else{
    $response["status"] = "Planes Found" ;
    $response["result"] =  $numPlanes;
}
echo json_encode($response);