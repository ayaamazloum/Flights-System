<?php
include('connection.php');

// Check if the user ID is provided in the request
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET['userId'])) {
    $userId = $_GET['userId'];

    // Fetch the user's information from the database
    $query = $mysqli->prepare('SELECT name, email, phone_number, gender, birth_date, balance FROM users WHERE id = ?');
    $query->bind_param('i', $userId);
    $query->execute();
    $query->bind_result($name, $email, $phone_number, $gender, $birth_date, $balance);
    $query->fetch();

    // Prepare response data
    $response['status'] = "success";
    $response['name'] = $name;
    $response['email'] = $email;
    $response['phone_number'] = $phone_number;
    $response['gender'] = $gender;
    $response['birth_date'] = $birth_date;
    $response['balance'] = $balance;
} else {
    $response['status'] = "error";
    $response['message'] = "User ID not provided in the request";
}

// Output the response as JSON
echo json_encode($response);
?>
