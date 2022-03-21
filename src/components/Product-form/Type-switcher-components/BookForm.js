import "../AddProductForm.css"
import React, { useState, useRef } from "react";
import { If, Then } from 'react-if'; //Helps keep the code less complicated and easier to read

const BookForm = (props) => {
    const weightInputRef = useRef();
    const [weightlengthError, setweightLengthError] = useState(false);

    function formSubmitHandler(e){
        
        e.preventDefault();
        const weightValue = weightInputRef.current.value;
        
        //Weight form Validation
        //First check if weightvalue includes letters
        if(isNaN(weightValue)){

            props.funcWeight("//ERROR WRONG FORMAT//"); //Send a prop with a value wrong format error into Addproduct.js
        
        }else if(weightValue.includes(".")){  //If entered with a decimal point

            var weightSplit = weightValue.split(".");   //Split the input

            if(weightSplit[0].length > 3){  //Count how many characters before decimal point
                setweightLengthError(true);
                props.funcWeight("//ERROR//"); //Send a prop with a value error into Addproduct.js
            }else{
                setweightLengthError(false);
                props.funcWeight(weightValue); //If under 7 then send to Addproduct.js
            }

        }else{ //If not entered with a decimal point
            
            if(weightValue.length > 3){ //Count how many characters
                setweightLengthError(true);
                props.funcWeight("//ERROR//"); //Send a prop with a value error into Addproduct.js
            }else{
                setweightLengthError(false);
                props.funcWeight(weightValue); //If under 7 then send to Addproduct.js
            }

        }
    }

    return(
        <form>
            <div className="row">
                <label htmlFor="weight">Weight (KG)</label>
                <input type="text" id="weight" name="weight" placeholder="e.g. 3" onChange={formSubmitHandler} required ref={weightInputRef}></input>
                {/* eslint-disable-next-line */}
                <If condition={weightlengthError}>
                    <Then>
                        <div className="input-error">
                            <p>Maximum amount of characters before a decimal point is 2!</p>
                        </div>
                    </Then>
                </If>
            </div>
            <div className="row">
                <p><b>Please provide the weight in kilograms. Remember not to write KG into the textbox!</b></p>
            </div>
        </form>
    );
}

export default BookForm;