<?php 
include('db.php');
session_start();
	if(!@$_SESSION['username'])
	{
		return false;
	}
	
	$id = $_POST['id'];
	$sql = 'DELETE FROM users WHERE id = :id';
	$stmt = $pdo -> prepare($sql);
	$stmt -> execute( ['id' => $id ]);
	if($stmt == true){
		echo "User has been deleted";
	}
?>