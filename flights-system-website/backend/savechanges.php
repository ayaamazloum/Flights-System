<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['name'], $_POST['email'], $_POST['password'], $_POST['phone_number'], $_POST['gender'], $_POST['birth_date'],$_POST['userId'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $phone = $_POST['phone_number'];
        $gender = $_POST['gender'];
        $birthdate = $_POST['birth_date'];
        $userId=$_POST['userId'];

        $timestamp=strtotime($birthdate);
        $formatted_date=date('Y-m-d',$timestamp);

        print_r($_POST);

        $query = $mysqli->prepare('UPDATE users SET name=?, email=?, password=?, phone_number=?, gender=?, birth_date=? WHERE id=?');
        $query->bind_param('ssssssi', $name, $email, $password, $phone, $gender, $formatted_date, $userId);
        
        if($query->execute()){

         
            $response['status'] = "success";
            $response['message'] = "User profile updated successfully";
        } else {
            $response['status'] = "error";
            $response['message'] = "Failed to update user profile";
        }
    } else {
        $response['status'] = "error";
        $response['message'] = "Incomplete data received";
    }
} else {
    $response['status'] = "error";
    $response['message'] = "Invalid request method";
}

echo json_encode($response);
?>
