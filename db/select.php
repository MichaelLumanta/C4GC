<?php
include'database_connections.php';

$sql="Select * FROM report";
$result = mysqli_query($con,$sql);

	if(!$result){
	die("Error: Data not Found..");
	}
    while ($row= mysqli_fetch_array($result))
	{
	$arr[] = array(
	'Category'=>$row[2],
	'Description'=>$row[3],
	'Student_Id'=>$row[4],
	'Date'=>$row[5]

	);
	}

	echo json_encode($arr);
mysqli_close($con);

?>
