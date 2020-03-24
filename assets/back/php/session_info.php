<?php

include('db.php');
session_start();
	if(!@$_SESSION['username'])
	{
		return false;
	}

	$output = array(

		'firstName' =>  ucfirst($_SESSION['first_name']),
		'lastName'  =>  ucfirst($_SESSION['last_name']),
		'userName' 	=>  $_SESSION['username'],
		'email' 	=>	$_SESSION['email'],
		'image' 	=>	$_SESSION['image']
		);
	echo json_encode($output);
?>