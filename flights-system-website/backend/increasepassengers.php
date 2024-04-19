<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['flightId'])) {
        $flightId = $_POST['flightId'];

        $query = $mysqli->prepare('UPDATE flights SET number_of_passengers = number_of_passengers + 1 WHERE id= ?');
        $query->bind_param('i', $flightId);
        $query->execute();

        if ($query->affected_rows > 0) {
            $response['status'] = "success";
            $response['message'] = "Number of passengers updated successfully";
        } else {
            $response['status'] = "error";
            $response['message'] = "Failed to update number of passengers";
        }
    } else {
        $response['status'] = "error";
        $response['message'] = "Flight number not provided";
    }
} else {
    $response['status'] = "error";
    $response['message'] = "Invalid request method";
}

echo json_encode($response);
?>
