<?php
include('connection.php');

$query=$mysqli->prepare(
"SELECT m.id, m.text, users.name 
FROM messages m
INNER JOIN users on users.id = m.user_id
where m.status !=1");

$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

$query->bind_result($id,$text,$name);

if($num_rows==0){
    $response["status"] = "No Chat Found";
}else{
    $response["status"] = "Success";
    $chats=[];
    while($query->fetch()){
        $chat= [
        "id" => $id,
        "text" => $text,
        "name" => $name
        
    ];
    $chats[]=$chat;
    }
    $response["chats"] = $chats;

}

echo json_encode($response);