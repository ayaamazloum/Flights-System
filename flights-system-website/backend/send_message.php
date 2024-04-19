<?php
include('connection.php');

$text = $_POST['text'];
$user_id = (int) $_POST['user_id'];

$query1 = $mysqli->prepare('select id
    from users
    where id=?');
$query1->bind_param('i', $user_id);
$query1->execute();
$query1->store_result();
$query1->bind_result($actual_user_id);
$query1->fetch();


$query = $mysqli->prepare('insert into messages (text, user_id) values (?, ?)');
$query->bind_param('si', $text, $actual_user_id);
$query->execute();
$response['status'] = "success";
$response['message'] = "Message was created successfully";

echo json_encode($response);