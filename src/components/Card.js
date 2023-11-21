import React, { useState } from "react";
import { useStateContext, useDispatchContext } from "./ContextReducer";
import { useNavigate } from "react-router-dom";


function Card(props) {
  const navigate = useNavigate();
  const data = useStateContext();
  const quantity = Object.keys(props.foodOpt);
  const amount = Object.values(props.foodOpt);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(amount[0]);
  const [sizeName, setSizeName] = useState(quantity[0]);
  const dispatch = useDispatchContext();

  const sizeHandler = (e) => {
    setSize(e.target.value);
    let indx = amount.indexOf(e.target.value);
    setSizeName(quantity[indx]);
  };

  const totalPrice = qty * size;

  const AddToCartHandler = () => {
    if (!data) {
      return; 
    }
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
    let update=false;
    let indexx;
    let quant;
    let pricee;
    data.map((item, index)=>{
      if(item.id===props.foodItem.id){
        if(item.size===sizeName){
          update=true;
          indexx=index;
          quant = parseInt(item.qty);
          pricee=parseInt(item.price);
        }
      }
      return indexx;
    })

    console.log(update, indexx)

    if(update!==true){
      dispatch({
        type: "add",
        id: props.foodItem.id,
        name: props.foodItem.name,
        img: props.foodItem.img,
        qty: qty,
        size: sizeName,
        price: totalPrice,
      });
    }else if(update===true){
      dispatch({
        type: "update",
        index:indexx,
        qty: parseInt(qty)+quant,
        price: totalPrice+pricee
      });
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card">
        <img className="card-img-top" src={props.foodItem.img} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}</p>
          <div className="howMuch">
            <select
              name="amount"
              onChange={(e) => setQty(e.target.value)}
              id="amount"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <select name="quantity" onChange={sizeHandler} id="quantity">
              {quantity.map((element, index) => {
                return <option value={amount[index]}>{element}</option>;
              })}
            </select>
            <p style={{ display: "inline" }}>
              Price : <span>{totalPrice}</span>
            </p>
          </div>
          <hr />
          <button className="btn btn-success" onClick={AddToCartHandler}>
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
