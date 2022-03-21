import "../AddProductForm.css"
import React, { useState, useRef } from "react";
import { If, Then } from 'react-if'; //Helps keep the code less complicated and easier to read

const DvdForm = (props) => {
    const sizeInputRef = useRef();
    const [sizelengthError, setsizelengthError] = useState(false);

    function formSubmitHandler(e){
        
        e.preventDefault();
        const sizeValue = sizeInputRef.current.value;
        
        //DVD size validation, this works exactly the same as BookForm.js and FurnitureForm.js. Better documentation in BookForm.js
        //Check if only numbers entered
        if(isNaN(sizeValue)){

            props.funcSize("//ERROR WRONG FORMAT//");
        
        }else if(sizeValue.includes(".")){  //Check the length of the entered number if it has a decimal point

            var sizeSplit = sizeValue.split(".");

            if(sizeSplit[0].length > 4){
                setsizelengthError(true);
                props.funcSize("//ERROR//");
            }else{
                setsizelengthError(false);
                props.funcSize(sizeValue);
            }

        }else{  //Check the length of the entered number if it dosen't have a decimal point
            
            if(sizeValue.length > 4){
                setsizelengthError(true);
                props.funcSize("//ERROR//");
            }else{
                setsizelengthError(false);
                props.funcSize(sizeValue);
            }

        }
    }

    return(
        <form>
            <div className="row">
                <label htmlFor="size">Size (MB)</label>
                <input type="text" id="size" name="size" placeholder="e.g. 700" onChange={formSubmitHandler} required ref={sizeInputRef}></input>
                {/* eslint-disable-next-line */}
                <If condition={sizelengthError}>
                    <Then>
                        <div className="input-error">
                            <p>Maximum amount of characters before a decimal point is 4!</p>
                        </div>
                    </Then>
                </If>
            </div>
            <div className="row">
                <p><b>Please provide the size of the DVD in megabytes. Remember not to write MB into the textbox!</b></p>
            </div>
        </form>
    );
}

export default DvdForm;