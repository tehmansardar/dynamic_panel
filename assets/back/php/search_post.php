<?php
         
include('db.php');
session_start();
    if(!@$_SESSION['username'])
    {
        return false;
    }

$output  = array();
$search = @$_POST['search'];

$sql = 'SELECT * FROM posts WHERE title LIKE ? ORDER BY id DESC';
$stmt = $pdo -> prepare($sql);
$stmt -> execute([$search]);
while( $row = $stmt -> fetch() ){
		 $id 			= 	$row -> id;
		 $image 		= 	$row -> image;
		 $title 		= 	$row -> title;
		 $date 			= 	getdate($row -> date);
            $day = $date['mday'];
            $month = substr($date['month'],0,3);
            $year = $date['year'];
		 $author_image  = 	$row -> author_image;
		 $author 		= 	$row -> author;
		 $views 		= 	$row -> views;
		 $status 		= 	$row -> status;

$output[] =   array(

     'id'           =>  $id,
     'image'        =>  $image,
     'title'        =>  $title,
     'day'         =>  $day,
     'month'         =>  $month,
     'year'         =>  $year,
     'authorImage'  =>  $author_image,
     'author'       =>  $author,
     'views'        =>  $views,
     'status'       =>  $status

  );

}

echo json_encode($output);

?>