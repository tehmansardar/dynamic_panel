<?php
         
include('db.php');
session_start();
    if(!@$_SESSION['username'])
    {
        return false;
    }

    	$userId = $_SESSION['id'];
	 	$firstName = $_SESSION['first_name'];
	 	$lastName = $_SESSION['last_name'];
	 	$userName = $_SESSION['username'];
	 	$userEmail = $_SESSION['email'];
	 	$userImage = $_SESSION['image'];
	 	$userRole = $_SESSION['role'];

 $output = array(

 	'id' =>	$userId,
 	'firstName' =>	$firstName,
 	'lastName' =>	$lastName,
 	'userName' =>	$userName,
 	'userEmail' =>	$userEmail,
 	'userImage' =>	$userImage,
 	'userRole' =>	$userRole
 );
 echo json_encode($output);

 ?>