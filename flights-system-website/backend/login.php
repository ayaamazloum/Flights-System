<?php
session_start();
include('connection.php');

if (isset($_POST['email'], $_POST['password'])) {
    $loginEmail = $_POST['email'];
    $password = $_POST['password'];

    if ($loginEmail === 'admin@gmail.com') {
        
        $_SESSION['isAdmin'] = true;
        $response['isAdmin'] = true;
        $response['status'] = "logged in";
        echo json_encode($response);
        exit;
    }

    $query = $mysqli->prepare('SELECT * FROM users WHERE email=?');
    $query->bind_param('s', $loginEmail);
    $query->execute();
    $query->store_result();
    $numRows = $query->num_rows();

    if ($numRows >0) { 
        $query->bind_result($id, $name, $email, $hashed_password, $phone_number, $gender, $birth_date, $balance, $preferences);
        $query->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $id;
            $_SESSION['user_name'] = $name;
            $_SESSION['user_email'] = $email;
            $_SESSION['user_phone_number'] = $phone_number;
            $_SESSION['user_gender'] = $gender;
            $_SESSION['user_birth_date'] = $birth_date;
            $_SESSION['user_balance'] = $balance;
            $_SESSION['user_preferences'] = $preferences;

            $response['status'] = "logged in";
            $response['user_id'] = $id;
            $response['name'] = $name;
            $response['email'] = $email;
            $response['phone-number'] = $phone_number;
            $response['gender'] = $gender;
            $response['birth-date'] = $birth_date;
            $response['balance'] = $balance;
            $response['preferences'] = $preferences;
            $response['isLogged'] = true;
        } else {
            $response['status'] = "incorrect credentials";
            $response['isLogged'] = false;
        }
    } else {
        $response['status'] = "user not found";
        $response['isLogged'] = false;
    }
} else {
    $response['status'] = "error";
    $response['isLogged'] = false;
}

echo json_encode($response);
?>
