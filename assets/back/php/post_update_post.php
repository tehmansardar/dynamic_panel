<?php
include('db.php');
session_start();
	if(!@$_SESSION['username'])
	{
		return false;
	}

$date = time();
$update_author = "Tehman";
$author_image = "12.jpg";

	//Response Variables		 
$msgTitle= '';
$msgImage= '';
$msgCategory= '';
		//$msgTags= '';
$msgDesc= '';

//Post Id
$update_id = $_POST['update-id'];
		//Post Title
$update_title = $_POST['update-title'];

if(!empty($update_title))
{

	$update_title = trim($update_title);
	$update_title = preg_replace("#[^A-Za-z0-9' ]#i", "", $update_title);
}
else
{
	$msgTitle ='Title Is Empty';
}


		 //Post Image
$update_image = $_FILES['update-image']['name'];
$update_image_size = $_FILES['update-image']['size'];
$update_image_tmp = $_FILES['update-image']['tmp_name'];

if(!empty($update_image))
{
	$explode = explode('.',$update_image);
	$end = end($explode);
	$allowed_ext = array('jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'PNG', 'gif');

	if(in_array($end, $allowed_ext))
	{

		if($update_image_size <= 1024 * 1024)
		{
			$refined_image = md5(rand()).".".$end;
			$path = "../../../data/".$refined_image;
			move_uploaded_file($update_image_tmp, $path); 
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
	$msgImage = '';
}




		 //Post Category
$update_category = $_POST['update-category'];

if(!empty($update_category))
{

	$update_category = trim($update_category);
	$update_category = preg_replace("#[^A-Za-z0-9 ]#i", "", $update_category);
}
else
{
	$msgCategory ='Choose category';
}


		 //Post Status
$update_status = $_POST['update-status'];


		 //Post Description
$update_description = $_POST['update-description'];

if(!empty($update_description))
{

	$update_description = trim($update_description);
	$update_description = preg_replace("#[^A-Za-z0-9'_ ]#i", "", $update_description);
}
else
{
	$msgDesc ='Write Something About Post';
}

$update_tags = 'Tehman,sardar';


	// Query Preparation
if(empty($msgTitle) && !empty($update_image) && empty($msgImage) && empty($msgCategory) && empty($msgDesc))
{
	$sql = 'UPDATE posts SET date = :date, title = :title, author = :author, author_image = :author_image, image = :image, categories = :categories, tags = :tags, post_data = :post_data, status = :status  WHERE id=:id';

	$stmt = $pdo -> prepare($sql);
	$stmt -> execute([
		'date'			 => $date,
		'title'			 => $update_title,
		'author'		 => $update_author,
		'author_image'   => $author_image,
		'image'			 => $refined_image,
		'categories'	 => $update_category,
		'tags'			 => $update_tags,
		'post_data'		 => $update_description,
		'status'		 => $update_status,
		'id'			 => $update_id
	]);

}
if(empty($msgTitle) && empty($update_image) && empty($msgImage) && empty($msgCategory) && empty($msgDesc))
{
	
	$sql = 'UPDATE posts SET date = :date, title = :title, author = :author, author_image = :author_image, categories = :categories, tags = :tags, post_data = :post_data, status = :status  WHERE id=:id';

	$stmt = $pdo -> prepare($sql);
	$stmt -> execute([
		'date'			 => $date,
		'title'			 => $update_title,
		'author'		 => $update_author,
		'author_image'   => $author_image,
		'categories'	 => $update_category,
		'tags'			 => $update_tags,
		'post_data'		 => $update_description,
		'status'		 => $update_status,
		'id'			 => $update_id
	]);

}


$output = array(  
	'msgTitle'   	=>  $msgTitle,  
	'msgImage'   	=>  $msgImage,
	'msgCategory'    =>  $msgCategory,
	'msgDesc'	   	=>  $msgDesc  
);  

echo json_encode($output);

?>