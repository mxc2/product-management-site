import "./Header.css"
import "./Home.css"
import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import ItemList from '../components/Products/ProductList';
import { If, Then, Else } from 'react-if'; //Helps keep the code less complicated and easier to read


function Home(){     
    const [isLoading, setIsLoading] = useState(true);
    const [loadedItems, setLoadedItems] = useState([]);
    const [selectedProduct, setselectedProduct] = useState([{selected: ""}])
    const deleteProducts = "https://scandiwebjuniordevelopertestsimmer.000webhostapp.com/old/DeleteProduct.php";
    const showProducts = "https://scandiwebjuniordevelopertestsimmer.000webhostapp.com/old/ShowProducts.php";

    //Getting the selected product SKU from Item.js
    const setSelected=(data)=>{

        //Getting the index of selected product from array "selectedProduct"
        var index = selectedProduct.findIndex(x => x.selected === data)

        //If index equals -1 then add selected product SKU to array, else delete it from list
        if(index === -1){
            let newselectedProduct={selected: data};
            setselectedProduct([...selectedProduct,newselectedProduct]);
        }else{
            selectedProduct.splice(index,1);
        }
    }

    function DeleteProducts(){

        //How many products selected to be deleted
        var length = selectedProduct.length;

        //For every selected product, send axios method Delete, to delete it from the database
        for(var i = 0; i < length; i++){

            fetch(deleteProducts, {
                method: 'POST',
                body: JSON.stringify(selectedProduct[i])
            }).then(fetch(showProducts).then(res => {
                return res.json();
              }).then(data =>{
                setLoadedItems(data);
            }))
        }

            
    }

    //Fetch the products and send to item.js
    useEffect(()=>{
        fetch(showProducts).then(res => {
          return res.json();
        }).then(data =>{
          setIsLoading(false);
          setLoadedItems(data);
        });
      },[])

        return(
            <div>
                {/* Header  CHANGE TITLE AND CSS*/}
                <div className="header">
                    <h1 className="logo">Product List</h1>
                    <div className="header-buttons">
                        <Link to="add-product">
                            <button className="button">ADD</button>
                        </Link>
                        <button className="button" id="delete-product-btn" onClick={DeleteProducts}>MASS DELETE</button>
                    </div>
                </div>

                {/* Line under header */}
                <div className="line">
                    <hr/>
                </div>    
                
                {/* Warning message, if no data in DB or is loading */}
                {/* eslint-disable-next-line */}
                <If condition={loadedItems == "" && isLoading == false}>
                    <Then>
                        <div className="container warning">
                            <p>There are no products in the database!</p>
                        </div>
                    </Then>
                    <Else>
                       <If condition={isLoading}>
                            <div className="container warning">
                                <p>Loading products!</p>
                            </div>
                        </If> 
                    </Else>
                </If>

                {/* Products list */}
                <ItemList funcSelect={setSelected} items={loadedItems} />                                  
        </div>
        )
    }   

export default Home;