<?php
include('db.php');
session_start();
	if(!@$_SESSION['username'])
	{
		return false;
	}
$id =  $_POST['id'];
$action = $_POST['action'];
	if($action == 1){
		$sql = 'SELECT * FROM users WHERE id = :id';
		$stmt = $pdo->prepare($sql);
		$stmt -> execute(['id' => $id]);
		$user = $stmt -> fetch();
			$id 			= $user -> id;
			$first_name 	= $user -> first_name;
			$last_name 		= $user -> last_name;
			$username 		= $user -> username;
			$email 			= $user -> email;
			$role 			= $user -> role;
			$details 		= $user -> details;

	$output = array(

				'id'		=>	$id, 						
				'fname'		=>	$first_name, 			
				'lname'		=>	$last_name, 			
				'username'	=>	$username, 	
				'email'		=>	$email, 		
				'role'		=>	$role,
				'desc'		=>	$details		

		);
		
}
echo json_encode($output);

 ?>