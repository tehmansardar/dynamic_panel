<?php
include('db.php');
session_start();
	if(!@$_SESSION['username'])
	{
		return false;
	}

$date = time();
 $post_author = $_SESSION['first_name'];
 $author_image = $_SESSION['image'];

	//Response Variables		 
$msgTitle= '';
$msgImage= '';
$msgCategory= '';
		//$msgTags= '';
$msgDesc= '';


		//Post Title
$post_title = $_POST['post-title'];

if(!empty($post_title))
{

	$post_title = trim($post_title);
	$post_title = preg_replace("#[^A-Za-z0-9' ]#i", "", $post_title);
}
else
{
	$msgTitle ='Title Is Empty';
}


		 //Post Image
$post_image = $_FILES['post-image']['name'];
$post_image_size = $_FILES['post-image']['size'];
$post_image_tmp = $_FILES['post-image']['tmp_name'];

if(!empty($post_image))
{
	$explode = explode('.',$post_image);
	$end = end($explode);
	$allowed_ext = array('jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'PNG', 'gif');

	if(in_array($end, $allowed_ext))
	{

		if($post_image_size <= 1024 * 1024)
		{
			$refined_image = md5(rand()).".".$end;
			$path = "../../../data/".$refined_image;
			move_uploaded_file($post_image_tmp, $path); 
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


		 //Post Category
$post_category = $_POST['post-category'];

if(!empty($post_category))
{

	$post_category = trim($post_category);
	$post_category = preg_replace("#[^A-Za-z0-9 ]#i", "", $post_category);
}
else
{
	$msgCategory ='Choose category';
}


		 //Post Title
$post_status = $_POST['post-status'];


		 //Post Description
$post_description = $_POST['post-description'];

if(!empty($post_description))
{

	$post_description = trim($post_description);
	$post_description = preg_replace("#[^A-Za-z0-9'_ ]#i", "", $post_description);
}
else
{
	$msgDesc ='Write Something About Post';
}

$post_tags = 'zeehan,sardar';


	// Query Preparation
if(empty($msgTitle) && empty($msgImage) && empty($msgCategory) && empty($msgDesc))
{
	$sql = 'INSERT INTO posts (date, title, author, author_image, image, categories, tags, post_data, status) VALUES (:date, :title, :author, :author_image, :image, :categories, :tags, :post_data, :status)';

	$stmt = $pdo -> prepare($sql);
	$stmt -> execute([
		'date'			 => $date,
		'title'			 => $post_title,
		'author'		 => $post_author,
		'author_image'   => $author_image,
		'image'			 => $refined_image,
		'categories'	 => $post_category,
		'tags'			 => $post_tags,
		'post_data'		 => $post_description,
		'status'		 => $post_status
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