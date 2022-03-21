<?php

abstract class Product {
  private $sku;
  private $name;
  private $price;
  
  //Set-s
  
  public function setSku($sku){
      $this->sku = $sku;
  }
  
  public function setName($name){
      $this->name = $name;
  }
  
  public function setPrice($price){
      $this->price = $price;
  }
  
  //Get-s
  
  public function getSku(){
      return $this->sku;
  }
  
  public function getName(){
      return $this->name;
  }
  
  public function getPrice(){
      return $this->price;
  }

  abstract public function getAddition() : string; 
}

class Disc extends Product {
  private $size;
  
  public function setSize($size){
    $this->size = $size;
  }
  
  public function getSize() {
    return $this->size; 
  }
  
  //Get the edited size
  public function getAddition() : string {
    return "Size: $this->size MB ";
  }
  
  //Get all product data as array
  public function getAsArray(){
    $array = new stdClass();
    
    $array->sku = $this->getSku();
    $array->name = $this->getName();
    $array->price = $this->getPrice();
    $array->specific = $this->getAddition();
    
    return $array;
  }
}

class Book extends Product {
  private $weight;
  
  public function setWeight($weight){
    $this->weight = $weight;
  }
    
  public function getWeight(){
    return $this->weight; 
  }
  
  //Get the edited weight
  public function getAddition() : string{
    return "Weight: $this->weight KG"; 
  }
  
  //Get all product data as array
  public function getAsArray(){
    $array = new stdClass();
    
    $array->sku = $this->getSku();
    $array->name = $this->getName();
    $array->price = $this->getPrice();
    $array->specific = $this->getAddition();
    
    return $array;
  }
}

class Furniture extends Product {
  private $height;
  private $width;
  private $length;
  
  public function setHeight($height){
      $this->height = $height;
  }
  
  public function setWidth($width){
      $this->width = $width;
  }
  
  public function setLength($length){
      $this->length = $length;
  }
  
  public function getHeight(){
      return $this->height;
  }
  
  public function getWidth(){
      return $this->width;
  }
  
  public function getLength(){
      return $this->length;
  }
  
  //Get the edited furniture size
  public function getAddition() : string{
    return "Dimension: $this->height x $this->width x $this->length"; 
  }
  
  //Get all product data as array
  public function getAsArray(){
    $array = new stdClass();
    
    $array->sku = $this->getSku();
    $array->name = $this->getName();
    $array->price = $this->getPrice();
    $array->specific = $this->getAddition();
    
    return $array;
  }
}