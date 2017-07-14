<?php
// Including database connections
require_once 'database_connections.php';

if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }


    if(isset($_GET['report']))
    {
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$report = $request->report;
$studentId = $request->studentId;
$category = $request->category;
$location=$request->location;
$date= date("Y-m-d h:i:sa");


$query="INSERT INTO report(Report_Id,Image,Category,Description,location,Student_Id,Date_Reported,Status,Count) VALUES('','','".$category."','".$report."','".$location."','".$studentId."','".$date."','Sent','1')";
$result=mysqli_query($con,$query);

if(!$result){
echo json_encode("fail");}
else{
  echo json_encode("Worked");
}
}
if(isset($_GET['register']))
{
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $Name=$request->Name;
  $User=$request->User;
  $Pass=$request->Pass;
  $query="INSERT INTO guests(ID,img,Username,Password,FullName) VALUES('','','".$User."','".$Pass."','".$Name."')";
$result=  mysqli_query($con,$query);
if(!$result){
echo json_encode("fail");}
else{
  echo json_encode("Worked");
}
  }


?>
