<?php
include'database_connections.php';

header('Content-Type: application/json');
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


$table= null;

if(isset($_GET['report']))
{
	$account=$_GET['account'];
	$table= "report";
	$sql="Select * FROM $table where Student_Id=$account ";
	$result = mysqli_query($con,$sql);

		if(!$result){
		die("Error: Data not Found..");
		}
		$data=array();
			while ($row= mysqli_fetch_assoc($result))
		{
			array_push($data,$row);
		//$arr[] = array(
		// 'Category'=>$row[2],
		// 'Description'=>$row[3],
		// 'Student_Id'=>$row[4],
		// 'Date'=>$row[5]

		//);
		}

		echo json_encode($data);
	mysqli_close($con);

}
if(isset($_GET['studentaccounts']))
{
	$username=($_GET['username']);
	$password=($_GET['password']);
	$table= "studentaccounts";
	$sql="Select * FROM $table where StudentID=".$username." && Password=".$password."";
	$result = mysqli_query($con,$sql);

		if(!$result){
		die("Error: Data not Found..");
		}
		$data=array();
	    while ($row= mysqli_fetch_assoc($result))
		{
			array_push($data,$row);
		//$arr[] = array(
		// 'Category'=>$row[2],
		// 'Description'=>$row[3],
		// 'Student_Id'=>$row[4],
		// 'Date'=>$row[5]

		//);
		}

		echo json_encode($data);
	mysqli_close($con);

}
if(isset($_GET['guest']))
{
	$username=($_GET['username']);
	$password=($_GET['password']);
	$table= "guests";
	$sql="Select * FROM $table where Username='".$username."' && Password='".$password."'";
	$result = mysqli_query($con,$sql);

		if(!$result){

		die("Error: Data not Found..");
		}
		$data=array();
	    while ($row= mysqli_fetch_assoc($result))
		{
			array_push($data,$row);
		//$arr[] = array(
		// 'Category'=>$row[2],
		// 'Description'=>$row[3],
		// 'Student_Id'=>$row[4],
		// 'Date'=>$row[5]

		//);
		}

		echo json_encode($data);
	mysqli_close($con);

}

if(isset($_GET['guests']))
{
	$username=($_GET['username']);

	$table= "guests";
	$sql="Select * FROM $table where Username='".$username."'";
	$result = mysqli_query($con,$sql);

		if(!$result){
		die("Error: Data not Found..");
		}
		$data=array();
	    while ($row= mysqli_fetch_assoc($result))
		{
			array_push($data,$row);
		//$arr[] = array(
		// 'Category'=>$row[2],
		// 'Description'=>$row[3],
		// 'Student_Id'=>$row[4],
		// 'Date'=>$row[5]

		//);
		}

		echo json_encode($data);
	mysqli_close($con);

}
if(isset($_GET['guestsname']))
{
	$username=($_GET['username']);

	$table= "guests";
	$sql="Select * FROM $table where FullName=".$username."";
	$result = mysqli_query($con,$sql);

		if(!$result){
		die("Error: Data not Found..");
		}
		$data=array();
	    while ($row= mysqli_fetch_assoc($result))
		{
			array_push($data,$row);
		//$arr[] = array(
		// 'Category'=>$row[2],
		// 'Description'=>$row[3],
		// 'Student_Id'=>$row[4],
		// 'Date'=>$row[5]

		//);
		}

		echo json_encode($data);
	mysqli_close($con);

}
?>
