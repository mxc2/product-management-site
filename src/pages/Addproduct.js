import "./Header.css"
import "./Addproduct.css"
import React from "react";
import History from "../components/History";
import AddProductForm from "../components/Product-form/AddProductForm";
import DvdForm from "../components/Product-form/Type-switcher-components/DvdForm";
import FurnitureForm from "../components/Product-form/Type-switcher-components/FurnitureForm";
import BookForm from "../components/Product-form/Type-switcher-components/BookForm";
import { Link } from "react-router-dom"


class AddProduct extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        sku: "",
        name: "",
        price: "",
        size: null,
        weight: null,
        height: null,
        width: null,
        length: null,
        error: "",
        value: "",
    };
  }

  //Bunch of basically set-s, getting the data from child functions and putting the data into the right this.state...
  setSku = (data) => {
    this.setState({sku: data});
  }
  setName = (data) => {
    this.setState({name: data})
  }

  setPrice = (data) => {
    this.setState({price: data})
  }

  setSize = (data) => {
    this.setState({size: data})
  }

  setWeight = (data) => {
    this.setState({weight: data})
  }

  setHeight = (data) => {
    this.setState({height: data})
  }

  setWidth = (data) => {
    this.setState({width: data})
  }

  setLength = (data) => {
    this.setState({length: data})
  }

  //Form Validation
  handleFormValidation = e => {
    e.preventDefault();
    
    // If form inputs are empty.
    if (
      !this.state.sku ||
      !this.state.name ||
      !this.state.price ||
      !this.state.value ||
      (this.state.value === "DVD" && !this.state.size) ||
      (this.state.value === "Book" && !this.state.weight) ||
      (this.state.value === "Furniture" &&
      (!this.state.width || !this.state.height || !this.state.length))
    ) {
      this.setState({
        error: "Please, submit required data.",
      });
    } //If entered data is in wrong format
    else if (
      this.state.sku === "//ERROR WRONG FORMAT//" ||
      this.state.name === "//ERROR WRONG FORMAT//" ||
      this.state.price === "//ERROR WRONG FORMAT//" ||
      this.state.size === "//ERROR WRONG FORMAT//" ||
      this.state.weight === "//ERROR WRONG FORMAT//" ||
      this.state.width === "//ERROR WRONG FORMAT//" ||
      this.state.height === "//ERROR WRONG FORMAT//" ||
      this.state.length === "//ERROR WRONG FORMAT//"
    ) {
      this.setState({
        error: "Please, provide the data of indicated type.",
      });
    } //If One of the entered values is too long.
    else if (
      this.state.sku === "//ERROR//" ||
      this.state.name === "//ERROR//" ||
      this.state.price === "//ERROR//" ||
      this.state.size === "//ERROR//" ||
      this.state.weight === "//ERROR//" ||
      this.state.width === "//ERROR//" ||
      this.state.height === "//ERROR//" ||
      this.state.length === "//ERROR//"
    ) {
      this.setState({
        error: "Attention, one of the entered values is too long!",
      });
    } else {
      this.setState({ error: null });
      this.handleFormSubmit(e);
    }
  }
  
  //Send data to PHP server
  handleFormSubmit = (e) => {
    const addProduct = "https://scandiwebjuniordevelopertestsimmer.000webhostapp.com/old/AddProduct.php";

    fetch(addProduct, {
      method: 'POST',
      body: JSON.stringify(this.state)
    }).then((response) => {
      if (response.ok) {
        History.push("/");
      } else {
        throw new Error('Something went wrong');
      }
      //Go to main page
      
    }).catch((error) => {
      console.log(error)
    });
  };

  //Set selected div visible from typeswitcher
  divstatus = (e) =>{
    e.preventDefault();
    this.setState({value: e.target.value});
  };

  render(){

    //Type switcher, if for example DVD is chosen, then show {productType} with the DVD form
    let productType;
    if(this.state.value === "DVD"){
      productType = <DvdForm funcSize={this.setSize}/>;
      if(this.state.weight || this.state.width || this.state.height || this.state.length){
        this.setState({
          height: "",
          length: "",
          width: "",
          weight: "",
        })
      }
    }else if(this.state.value === "Furniture"){
      productType = <FurnitureForm funcHeight={this.setHeight} funcWidth={this.setWidth} funcLength={this.setLength}/>
      if(this.state.weight || this.state.size){
        this.setState({
          size: "",
          weight: "",
        })
      }
    }else if(this.state.value === "Book"){
      productType = <BookForm funcWeight={this.setWeight}/>;
      if(this.state.size || this.state.width || this.state.height || this.state.length){
        this.setState({
          height: "",
          length: "",
          width: "",
          size: "",
        })
      }
    }

    return (
      <div>
        {/* Header */}
        <div className="header">
            <h1 className="logo">Product Add</h1>
            <div className="header-buttons">
                <button onClick={this.handleFormValidation} className="button">Save</button>
                <Link to="">
                  <button className="button">Cancel</button>
                </Link>
            </div>
        </div>

        {/* Line under header */}
        <div className="line">
            <hr/>
        </div>

        {/* The form */}
        <div id="product_form">

            {/* Sku, name, price */ }
            <AddProductForm funcSku={this.setSku} funcName={this.setName} funcPrice={this.setPrice}/>

            {/* Type Switcher */}
            <div className="row">
                <label htmlFor="productType">Type Switcher</label>
                <select id="productType" onChange={this.divstatus}>
                    <option defaultValue value="">-- Choose --</option>
                    <option value="DVD">DVD</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Book">Book</option>
                </select>
            </div>
            
            {/* Type Switcher Result */}
            {productType}

            {/* Error message */}
            <div className="error">
                <p><b>{this.state.error}</b></p>
            </div>
        </div>
      </div>
      );
  }
}

export default AddProduct;
//Hey there! it's 18.10.2021 and boy do I feel like I am spending too much time optimizing this code :D. Feels like I am never going to finish this.