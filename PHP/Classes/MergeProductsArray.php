<?php

include ("DatabaseRequests.php");

class MergeProductsArray extends DatabaseRequests{

    public function mergeArray(){
        $databaseRequest = new DatabaseRequests();
        
        //Merge all 3 arrays together
        $list = array_merge($databaseRequest->getDiscs(), $databaseRequest->getBooks(), $databaseRequest->getFurnitures());
        
        //Sort it
        sort($list);
        
        return $list;
    }
}