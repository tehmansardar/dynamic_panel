<?php
	include('db.php');
	session_start();
	if(@$_SESSION['username'])
	{
		echo 1;
	}
	else
	{
		echo 0;
	}
 ?>