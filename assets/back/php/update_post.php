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
		$sql = 'SELECT * FROM posts WHERE id = :id';
		$stmt = $pdo->prepare($sql);
		$stmt -> execute(['id' => $id]);
		$post = $stmt -> fetch();
			$id 			= $post -> id;
			$title 			= $post -> title;
			$image 			= $post -> image;
			$categories 	= $post -> categories;
			$post_data 		= $post -> post_data;
			$status 		= $post -> status;

	$output = array(

				'id'			=>	$id, 						
				'title'			=>	$title, 			
				'image'			=>	$image, 			
				'categories'	=>	$categories, 	
				'postDesc'		=>	$post_data, 		
				'status'		=>	$status 		

		);
		
}
echo json_encode($output);

 ?>