<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: INSERT, GET, POST, OPTIONS");

include("Classes/MergeProductsArray.php");

$ShowProducts = new MergeProductsArray();

//Get the array that was merged at ProductsArray.php
echo json_encode($ShowProducts->mergeArray());