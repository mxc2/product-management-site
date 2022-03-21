import "./AddProductForm.css"
import {useRef, useState} from "react"
import React from "react"
import { If, Then } from "react-if" //Helps keep the code less complicated and easier to read


const AddProductForm = (props) => {
    const skuInputRef = useRef();
    const nameInputRef = useRef();
    const priceInputRef = useRef();
    const [skulengthError, setskulengthError] = useState(false);
    const [namelengthError, setnamelengthError] = useState(false);
    const [pricelengthError, setpricelengthError] = useState(false);

    function formSubmitHandler(e){
        
        e.preventDefault();
        const skuValue = skuInputRef.current.value;
        const nameValue = nameInputRef.current.value;
        const priceValue = priceInputRef.current.value;

        //SKU format and length validation. if a value dosen't go trough validation then it will either get a value of //ERROR// or //ERROR WRONG FORMAT//. This is meant to save space in Addproduct.js validation :)
        if(/[^a-zA-Z0-9]/.test(skuValue)){  //Check if skuValue is in the right format
            props.funcSku("//ERROR WRONG FORMAT//");
        }else if(skuValue.length > 12){  //If length over 12 characters
            setskulengthError(true);    //Set the state to true, so it would show the error that entered value is too long.
            props.funcSku("//ERROR//") //Send Error to Addproduct.js so it knows not to allow adding product.
        }else{
            setskulengthError(false);
            props.funcSku(skuValue); //If length is correct then send the value to Addproduct.js
        }

        //No name format validation needed in my opinion, and as there was no additional information on the test description, then I decided to have no validation except length
        if(nameValue.length > 70){
            setnamelengthError(true);
            props.funcName("//ERROR//")
        }else{
            setnamelengthError(false);
            props.funcName(nameValue);
        }

        //Price Input Validation
        if(isNaN(priceValue)){
            props.funcPrice("//ERROR WRONG FORMAT//"); //Detected that the value entered is not decimal
        }else if(priceValue.includes(".")){

            var priceSplit = priceValue.split(".");

            if(priceSplit[0].length > 6){
                setpricelengthError(true);
                props.funcPrice("//ERROR//"); //If length before decimal point is too long then ERROR
            }else{
                setpricelengthError(false);
                props.funcPrice(priceValue); //Otherwise set the value
            }
        }else{ 
            //If no decimal point in value, then just calculate the length of value
            if(priceValue.length > 6){
                setpricelengthError(true);
                props.funcPrice("//ERROR//"); //If length before is too long then ERROR
            }else{
                setpricelengthError(false);
                props.funcPrice(priceValue); //Otherwise set the value
            }
        }
    }

    return(
        <div>
            <div className="row">
                <label htmlFor="sku">SKU</label>
                <input type="text" id="sku" name="sku" placeholder="e.g. JVC200123" onChange={formSubmitHandler} required ref={skuInputRef}></input>
                {/* eslint-disable-next-line */}
                <If condition={skulengthError}>
                    <Then>
                        <div className="input-error">
                            <p>Maximum length is 12 characters!</p>
                        </div>
                    </Then>
                </If>
            </div>
            <div className="row">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="e.g. Acme DISC" onChange={formSubmitHandler} required ref={nameInputRef}></input>
                {/* eslint-disable-next-line */}
                <If condition={namelengthError}>
                    <Then>
                        <div className="input-error">
                            <p>Maximum length is 70 characters!</p>
                        </div>
                    </Then>
                </If>
            </div>
            <div className="row">
                <label htmlFor="price">Price ($)</label>
                <input type="text" id="price" name="price" placeholder="e.g. 0.99" onChange={formSubmitHandler} required ref={priceInputRef}></input>
                {/* eslint-disable-next-line */}
                <If condition={pricelengthError}>
                    <Then>
                        <div className="input-error">
                            <p>Maximum amount of characters before a decimal point is 6!</p>
                        </div>
                    </Then>
                </If>
            </div>
        </div>
    );
}

export default AddProductForm;