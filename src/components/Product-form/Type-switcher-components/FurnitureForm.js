import "../AddProductForm.css"
import React, { useState, useRef } from "react";
import { If, Then } from 'react-if'; //Helps keep the code less complicated and easier to read


const FurnitureForm = (props) => {
    const heightInputRef = useRef();
    const widthInputRef = useRef();
    const lengthInputRef = useRef();
    const [heightlengthError, setheightlengthError] = useState(false);
    const [widthlengthError, setwidthlengthError] = useState(false);
    const [lengthError, setlengthError] = useState(false);

    function formSubmitHandler(e){
        
        e.preventDefault();
        const heightValue = heightInputRef.current.value;
        const widthValue = widthInputRef.current.value;
        const lengthValue = lengthInputRef.current.value;
        
        //Furniture size validation, this works exactly the same as BookForm.js and DvdForm.js. Better documentation in BookForm.js
        //Check if entered values are only numbers
        if(isNaN(heightValue) || isNaN(widthValue) || isNaN(lengthValue)){

            props.funcHeight("//ERROR WRONG FORMAT//");
            props.funcWidth("//ERROR WRONG FORMAT//");
            props.funcLength("//ERROR WRONG FORMAT//");
        
        }else{
            if(heightValue.includes(".")){
                var heightSplit = heightValue.split(".");

                if(heightSplit[0].length > 5){
                    setheightlengthError(true);
                    props.funcHeight("//ERROR//");
                }else{
                    setheightlengthError(false);
                    props.funcHeight(heightValue);
                }
            }else{
                if(heightValue.length > 5){
                    setheightlengthError(true);
                    props.funcHeight("//ERROR//");
                }else{
                    setheightlengthError(false);
                    props.funcHeight(heightValue);
                }
            }

            if(widthValue.includes(".")){
                var widthSplit = widthValue.split(".");

                if(widthSplit[0].length > 5){
                    setwidthlengthError(true);
                    props.funcWidth("//ERROR//");
                }else{
                    setwidthlengthError(false);
                    props.funcWidth(widthValue);
                }
            }else{
                if(widthValue.length > 5){
                    setwidthlengthError(true);
                    props.funcWidth("//ERROR//");
                }else{
                    setwidthlengthError(false);
                    props.funcWidth(widthValue);
                }
            }

            if(lengthValue.includes(".")){
                var lengthSplit = lengthValue.split(".");

                if(lengthSplit[0].length > 5){
                    setlengthError(true);
                    props.funcLength("//ERROR//");
                }else{
                    setlengthError(false);
                    props.funcLength(lengthValue);
                }
            }else{
                if(lengthValue.length > 5){
                    setlengthError(true);
                    props.funcLength("//ERROR//");
                }else{
                    setlengthError(false);
                    props.funcLength(lengthValue);
                }
            }
        }      
    }

    return(
        <form>
            <div className="row">
                <label htmlFor="height">Height (CM)</label>
                <input type="text" id="height" name="height" placeholder="e.g. 24" onChange={formSubmitHandler} required ref={heightInputRef}></input>
                {/* eslint-disable-next-line */}
                <If condition={heightlengthError}>
                    <Then>
                        <div className="input-error">
                            <p>Maximum amount of characters before a decimal point is 5!</p>
                        </div>
                    </Then>
                </If>
            </div>
            <div className="row">
                <label htmlFor="width">Width (CM)</label>
                <input type="text" id="width" name="width" placeholder="e.g. 15" onChange={formSubmitHandler} required ref={widthInputRef}></input>
                {/* eslint-disable-next-line */}
                <If condition={widthlengthError}>
                    <Then>
                        <div className="input-error">
                            <p>Maximum amount of characters before a decimal point is 5!</p>
                        </div>
                    </Then>
                </If>
            </div>
            <div className="row">
                <label htmlFor="length">Length (CM)</label>
                <input type="text" id="length" name="length" placeholder="e.g. 45" onChange={formSubmitHandler} required ref={lengthInputRef}></input>
                {/* eslint-disable-next-line */}
                <If condition={lengthError}>
                    <Then>
                        <div className="input-error">
                        <   p>Maximum amount of characters before a decimal point is 5!</p>
                        </div>
                    </Then>
                </If>
            </div>
            <div className="row">
                <p><b>Please provide dimension in HxWxL format and input measurements in centimetres. Remember not to write CM into the textbox!</b></p>
            </div>
        </form>
    );
}

export default FurnitureForm;