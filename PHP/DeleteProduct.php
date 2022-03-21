<?php
	header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: POST, OPTIONS, INSERT");
    
    include ("Classes/DatabaseRequests.php");
	
	$rest_json = file_get_contents("php://input");
	$_POST = json_decode($rest_json, true);
	
	$product = new Disc();
	$product->setSku($_POST['selected']);
	
	//Delete Product
	$ProductDelete = new DatabaseRequests();
	$ProductDelete->deleteProduct($product->getSku());