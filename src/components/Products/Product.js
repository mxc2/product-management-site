import "./Product.css"

function Item(props){  

    //Sending the selected product sku to ItemList and then from there to home.js
    function SelectedProduct(){
        props.funcSelect(props.sku);
    }
    return(
        <div className="card">
            <div className="delete-checkbox">
                <input type="checkbox" id="delete-checkbox" name="delete-checkbox" value="product" onChange={SelectedProduct}/>
            </div>
            <div className="product">
                <div className="product-attributes">{props.sku}</div>
                <div className="product-attributes">{props.name}</div>
                <div className="product-attributes">{props.price} $</div>
                <div className="product-attributes">{props.description}</div>
            </div>
       </div>
    )
}

export default Item;