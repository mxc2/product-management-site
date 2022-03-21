<?php
//Class for doing diffrent DatabaseRequests, first three are for getting data from DB, 4 is for writing data to DB. 5 is for deleting data from DB.
include ("Product.php");
include ("ConnectDb.php");

class DatabaseRequests extends ConnectDb {

    public function getDiscs() {
        $Discs = [];
        $sql = "SELECT sku, name, price, size from products WHERE size IS NOT NULL";
        
        $trp = mysqli_query($this->connect(), $sql);
        
        $Disc = new Disc();
        
        while($r = mysqli_fetch_assoc($trp)) {
            $Disc->setSku($r['sku']);
            $Disc->setName($r['name']);
            $Disc->setPrice($r['price']);
            $Disc->setSize($r['size']);
    		
    		array_push($Discs, $Disc->getAsArray());
        }
        
        return $Discs;
    }
    
    public function getBooks() {
        $Books = [];
        $sql = "SELECT sku, name, price, weight from products WHERE weight IS NOT NULL";
        
        $trp = mysqli_query($this->connect(), $sql);
        
        $Book = new Book();
        
        while($r = mysqli_fetch_assoc($trp)) {
            $Book->setSku($r['sku']);
            $Book->setName($r['name']);
            $Book->setPrice($r['price']);
            $Book->setWeight($r['weight']);
    		
    		array_push($Books, $Book->getAsArray());
        }
        
        return $Books;
    }
    
    public function getFurnitures() {
        $Furnitures = [];
        $sql = "SELECT sku, name, price, height, width, length from products WHERE height IS NOT NULL AND width IS NOT NULL AND length IS NOT NULL";
        
        $trp = mysqli_query($this->connect(), $sql);
        
        $Furniture = new Furniture();
        
        while($r = mysqli_fetch_assoc($trp)) {
            $Furniture->setSku($r['sku']);
            $Furniture->setName($r['name']);
            $Furniture->setPrice($r['price']);
            $Furniture->setHeight($r['height']);
            $Furniture->setWidth($r['width']);
            $Furniture->setLength($r['length']);
    		
    		array_push($Furnitures, $Furniture->getAsArray());
        }
        
        return $Furnitures;
    }
    
    public function addProduct($sku, $name, $price, $size, $weight, $height, $width, $length) {
        $conn = $this->connect();
        
        $stmt = $conn->prepare("INSERT INTO products (sku, name, price, size, weight, height, width, length) VALUES(?,?,?,?,?,?,?,?)");
        
        $stmt->bind_param("ssdddddd", $sku, $name, $price, $size, $weight, $height, $width, $length);
	    $stmt->execute();
	    
    	$stmt->close();
    	$this->connect()->close();
        
    }
    
    public function deleteProduct($sku){
        $conn = $this->connect();
        
        $stmt = $conn->prepare("DELETE FROM products WHERE sku = ?");
        
        $stmt->bind_param('s', $sku);
        
        $stmt->execute();
    	$stmt->close();

    	$conn->close();
    }
    
}