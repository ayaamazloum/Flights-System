<?php
include('connection.php');

if(!isset($_POST["id"])){
    echo json_encode([
        "status"=>"something went wrong",
    ]);
}
else {
    $id = intval($_POST["id"]);

    $response;
    $query = $mysqli->prepare("UPDATE flights SET status = 'canceled' WHERE id = ?");
    $query->bind_param("i", $id);
    if($query->execute()){
        $response["status"] = "Success";
    }else{
        $response["status"] = "Failed";
    }

    echo json_encode($response);
}