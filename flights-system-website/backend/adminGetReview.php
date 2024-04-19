<?php
include('connection.php');

$query=$mysqli->prepare(
"SELECT ratings.rating,ratings.review,users.name,airlines.name
FROM ratings
INNER JOIN users on ratings.user_id=users.id
INNER JOIN airlines on ratings.airline_id=airlines.id");

$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

$query->bind_result($rating,$userReview,$name,$airline);

if($num_rows==0){
    $response["status"] = "No Reviews Found";
}else{
    $response["status"] = "Success";
    $reviewsArray=[];
    while($query->fetch()){
        $review= [
        "name" => $name,
        "rating" => $rating,
        "airline" => $airline,
        "review" => $userReview
    ];
    $reviewsArray[]=$review;
    }
    $response["review"] = $reviewsArray;

}

echo json_encode($response);
