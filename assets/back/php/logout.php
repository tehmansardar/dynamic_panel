<?php
ob_start();

session_start();

header("location:../../../signin.html");

session_destroy();


?>