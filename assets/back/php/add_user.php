<?php
	include('db.php');

	session_start();
	if(!@$_SESSION['username'])
	{
		return false;
	}

	$date = time();


	//Response Variables		 
		$msgFname = '';
		$msgLname = '';
		$msgUsername= '';
		$msgEmail= '';
		$msgPassword= '';
		$msgImage= '';
		$msgRole= '';
		$msgDesc= '';


	//User First Name
		 $first_name = $_POST['first-name'];
		 
		 if(!empty($first_name))
		 {

		 	 $first_name = trim($first_name);
			 $first_name = preg_replace("#[^A-Za-z0-9']#i", "", $first_name);
		 }
		 else
		 {
		 	$msgFname ='Empty first name';
		 }

	//User Last Name
		 $last_name = $_POST['last-name'];
		 
		 if(!empty($last_name))
		 {

		 	 $last_name = trim($last_name);
			 $last_name = preg_replace("#[^A-Za-z0-9']#i", "", $last_name);
		 }
		 else
		 {
		 	$msgLname ='Empty last name';
		 }

	//User username
		 $user_name = $_POST['user-name'];
		 
		 if(!empty($user_name))
		 {

		 	 $user_name = trim($user_name);
			 $user_name = preg_replace("#[^A-Za-z0-9_-]#i", "", $user_name);

			 //check username from databeses
			 $userNameQuery = 'SELECT * FROM users WHERE username = :username';
			 $stmt = $pdo -> prepare($userNameQuery);
			 $stmt -> execute (['username' => $user_name]);
			 $row_count = $stmt->fetchColumn();
			 if($row_count > 0)
			 {
			 	$msgUsername = 'Username already exists';
			 }
		 }
		 else
		 {
		 	$msgUsername ='Empty Username';
		 }

		 //User Email
		 $user_email = $_POST['user-email'];
		 $valid_email = '';
		 if(!empty($user_email))
		 {
		 	$regexp = "/^[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/";
		 	 $user_email = trim($user_email);
		 	 if(preg_match($regexp,$user_email))
		 	 {
				$valid_email = $user_email;
			 }
			 else
			 {
			 	$msgEmail = 'Invalid email';
			 }

			 //check username from databeses
			 $emailQuery = 'SELECT * FROM users WHERE email = :email';
			 $stmt = $pdo -> prepare($emailQuery);
			 $stmt -> execute (['email' => $valid_email]);
			 $row_count = $stmt->fetchColumn();
			 if($row_count > 0)
			 {
			 	$msgEmail = 'Email already exists';
			 }
		 }
		 else
		 {
		 	$msgEmail ='Empty email';
		 }

		 //User Password
		 $user_password = $_POST['user-password'];
		 
		 if(!empty($user_password))
		 {

		 	 $user_password = trim($user_password);
			 //Hash Password
			$options = ["COST" => 12];
			$hash_password = password_hash($user_password,PASSWORD_DEFAULT, $options);
		 }
		 else
		 {
		 	$msgPassword ='Empty password';
		 }

		 //User Image
		$user_image = $_FILES['user-image']['name'];
		$user_image_size = $_FILES['user-image']['size'];
		$user_image_tmp = $_FILES['user-image']['tmp_name'];

		 if(!empty($user_image))
		 {
		 	$explode = explode('.',$user_image);
			$end = end($explode);
			$allowed_ext = array('jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'PNG', 'gif');
			
			if(in_array($end, $allowed_ext))
			{
				
				if($user_image_size <= 1024 * 1024)
				{
					$refined_image = md5(rand()).".".$end;
					$path = "../../../data/user/".$refined_image;
					move_uploaded_file($user_image_tmp, $path); 
				}
				else
				{
					$msgImage = 'Size is greater than 1MB';
				}

			}
			else
			{
				$msgImage = 'Invalid image format';
			}

		 }
		 else
		 {
		 	$msgImage ='Please choose image';
		 }


		 //User Role
		 $user_role = $_POST['user-role'];
		 
		 if(!empty($user_role))
		 {

		 	 $user_role = trim($user_role);
			 $user_role = preg_replace("#[^A-Za-z0-9']#i", "", $user_role);
		 }
		 else
		 {
		 	$msgRole ='Assign user role';
		 }

		 //User Description
		 $user_description = $_POST['user-description'];
		 
		 if(!empty($user_description))
		 {

		 	 $user_description = trim($user_description);
			 $user_description = preg_replace("#[^A-Za-z0-9_-]#i", "", $user_description);
		 }
		 else
		 {
		 	$msgDesc ='Write Something About User';
		 }

	// Query Preparation
    if(empty($msgFname) && empty($msgLname) && empty($msgUsername) && empty($msgEmail) && !empty($valid_email) && empty($msgPassword) && empty($msgImage) && empty($msgRole) && empty($msgDesc))
	{
		$sql = 'INSERT INTO users (date, first_name, last_name, username, email, image, password, role, details) VALUES (:date, :first_name, :last_name, :username, :email, :image, :password, :role, :details)';
		
		$stmt = $pdo -> prepare($sql);
		$stmt -> execute([
					'date'			 => $date,
					'first_name'	 => $first_name,
					'last_name'		 => $last_name,
					'username'  	 => $user_name,
					'email'			 => $valid_email,
					'image'	 		 => $refined_image,
					'password'		 => $hash_password,
					'role'		 	 => $user_role,
					'details'		 => $user_description
		]);
	}

$output = array(
		'msgFname'    	=>  $msgFname ,
		'msgLname'    	=>  $msgLname ,
		'msgUsername'   =>  $msgUsername ,
		'msgEmail'   	=>  $msgEmail ,
		'msgPassword'   =>  $msgPassword ,
		'msgImage'    	=>  $msgImage ,
		'msgRole'    	=>  $msgRole ,
		'msgDesc'    	=>  $msgDesc
		);
echo json_encode($output);	
?>