<?php 

include ("connection.php");

$query=$mysqli->prepare(
    "SELECT p.id,p.manufacturer, p.model ,airlines.name
    FROM planes p
    INNER JOIN airlines ON p.airline_id=airlines.id
    ");

$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

$query->bind_result($id,$manufacturer,$model,$airline);

if($num_rows==0){
    $response["status"] = "No Planes Found";
}else{
    $response["status"] = "Success";
    $planes=[];
    while($query->fetch()){
        $plane= [
            "id"=>$id,
        "manufacturer" => $manufacturer,
        "model" => $model,
        "airline" => $airline
  
        
    ];
    $planes[]=$plane;
    }
    $response["planes"] = $planes;

}

echo json_encode($response);