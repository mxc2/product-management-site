import "./Product.css"
import Item from './Product'

function ItemList(props) {

  return(<div className="container-cards">
    {props.items.map(item=> (
     <Item 
      key={item.sku}
      sku={item.sku}
      name={item.name}
      price={item.price}
      description={item.specific}
      funcSelect={props.funcSelect}/>
    ))}
  </div>); 
}

export default ItemList;