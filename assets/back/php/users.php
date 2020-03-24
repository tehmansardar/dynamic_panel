<?php
 
include('db.php');
session_start();
     if(!@$_SESSION['username'])
     {
          return false;
     }
$output = array();
$stmt = $pdo->query('SELECT * FROM users ORDER BY id DESC');
while( $row = $stmt -> fetch() ){
		 $id 			  = 	$row -> id;
		 $image 		= 	$row -> image;
		 $name 		= 	ucfirst($row -> first_name) .' '. ucfirst($row -> last_name);
           $username     =    strtolower($row -> username);
          $email         =    $row -> email;
          $role          =    $row -> role;
		$date          =    getdate($row -> date);
            $day = $date['mday'];
            $month = substr($date['month'],0,3);
            $year = $date['year'];

$output[] =   array(

     'id'           =>  $id,
     'image'        =>  $image,
     'name'         =>  $name,
     'username'     =>  $username,
     'email'        =>  $email,
     'role'         =>  $role,
     'day'          =>  $day,
     'month'        =>  $month,
     'year'         =>  $year
  );

	
}
echo json_encode($output);

?>