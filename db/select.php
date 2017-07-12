<?php
include'database_connections.php';

$table= null;

if(isset($_GET['report']))
{
	$table= "report";
	$sql="Select * FROM $table ";
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
	$sql="Select * FROM $table where Username=".$username." && Password=".$password."";
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
	$sql="Select * FROM $table where Username=".$username."";
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
