<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: INSERT, POST, OPTIONS");
    
    include ("Classes/DatabaseRequests.php");
    
    $rest_json = file_get_contents("php://input");
	$_POST = json_decode($rest_json, true);
	
	//Set size, set weight, and then finally set sku, name, price and furniture details. We add Sku, Name and Price last, so they dont get overwritten.
	
	$DVD = new Disc();
    $DVD->setSize($_POST['size']);
    
	$Book = new Book();
    $Book->setWeight($_POST['weight']);
    
	$Furniture = new Furniture();
	$Furniture->setSku($_POST['sku']);
    $Furniture->setName($_POST['name']);
    $Furniture->setPrice($_POST['price']);
    $Furniture->setHeight($_POST['height']);
    $Furniture->setWidth($_POST['width']);
    $Furniture->setLength($_POST['length']);
	
	//Send to DatabaseRequests
    $Request = new DatabaseRequests();
    $Request->addProduct($Furniture->getSku(), $Furniture->getName(), $Furniture->getPrice(), $DVD->getSize(), $Book->getWeight(), $Furniture->getHeight(), $Furniture->getWidth(), $Furniture->getLength());
    
    
    