<?php

// $con = mysqli_connect('localhost', 'root', 'scare', 'dynamic_panel');

$host = 'localhost';
$user = 'root';
$password = 'scare';
$dbname = 'dynamic_panel';

// set DSN (Standard Data Source Name)

$dsn = 'mysql:host='.$host.'; dbname='.$dbname;
// Create a PDO instance
$pdo = new PDO($dsn, $user, $password);
$pdo -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

 ?>