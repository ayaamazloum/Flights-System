<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['userId'],$_POST['coins'])) {
        $userId=$_POST['userId'];
        $coins = $_POST['coins'];

        $query = $mysqli->prepare('INSERT INTO `coin-requests` (user_id, amount) VALUES (?, ?)');
        $query->bind_param('ii', $userId, $coins);
        $query->execute();

        if ($query->affected_rows > 0) {
            $response['status'] = "success";
            $response['message'] = "Coins request submitted successfully";
        } else {
            $response['status'] = "error";
            $response['message'] = "Failed to submit coins request";
        }
    }
     else {
        $response['status'] = "error";
        $response['message'] = "Incomplete data received";
    }
} else {
    $response['status'] = "error";
    $response['message'] = "Invalid request method";
}

echo json_encode($response);
?>
