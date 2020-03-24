<?php
	include('db.php');
	session_start();
	if(!@$_SESSION['username'])
	{
		return false;
	}
	
	$id =  $_POST['id'];
	$status = $_POST['status'];

	$sql = 'UPDATE posts SET status = :status WHERE id = :id';
	$stmt  = $pdo -> prepare($sql);
	$stmt -> execute( [ 'status' => $status ,'id' => $id ]);
?>