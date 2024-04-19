<?php
include('connection.php');

$query=$mysqli->prepare(
"SELECT `coin-requests`.id,`coin-requests`.`amount`,users.name,users.email 
FROM `coin-requests`
INNER JOIN users on users.id = `coin-requests`.`user_id`
WHERE `coin-requests`.`status` != 1");

$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

$query->bind_result($id,$amount,$name,$email);

if($num_rows==0){
    $response["status"] = "No Coin Requests Found";
}else{
    $response["status"] = "Success";
    $coins=[];
    while($query->fetch()){
        $coin= [
        "id" => $id,
        "name" => $name,
        "email" => $email,
        "amount" => $amount
    ];
    $coins[]=$coin;
    }
    $response["coins"] = $coins;

}

echo json_encode($response);
