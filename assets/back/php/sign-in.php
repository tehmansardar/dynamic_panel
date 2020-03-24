<?php
	include('db.php');
	
	$output = null;
	session_start();
	 $username = @$_POST['username'];
	 $username = trim($username);
	 $username = preg_replace("#[^A-Za-z0-9_-]#i", "", $username);
	 
	 $password = @$_POST['password'];
	 $password = trim($password);
	 
	 $sql = 'SELECT * FROM users WHERE username =:username';
	 
	 $stmt = $pdo -> prepare($sql);
	 $stmt -> execute(['username' => $username]);
	 while($row =  $stmt->fetch()){
	 	$getPassword = @$row -> password;
	 	//echo $row -> last_name;
	 	if ($row && password_verify($password, $getPassword))
	 {	
	 	$output = 1;
	 	$userId = $_SESSION['id'] = $row -> id;
	 	$firstName = $_SESSION['first_name'] = $row -> first_name;
	 	$lastName = $_SESSION['last_name'] = $row -> last_name;
	 	$userName = $_SESSION['username'] = $row -> username;
	 	$userEmail = $_SESSION['email'] = $row -> email;
	 	$userImage = $_SESSION['image'] = $row -> image;
	 	$userRole = $_SESSION['role'] = $row -> role;
    	
	 } 
	else
	 {
    	$output = 0;
	 }	
	 }
	 
	 

	 

	 echo $output;




	/*$row_count = $stmt->fetchColumn();
	
	if($row_count > 0)
	{ 
		while($row = $stmt -> fetch() ){
			
			if(password_verify($password, $row -> password))
			{
				echo 'good';
			}
		}
	}*/
	  
?>