import React from "react";

function OrderCard(props) {
  return (
    <div className="orderCard">
      <div className="orderImg">
        <img src={props.img} alt="..." />
      </div>
      <div className="orderDetail">
        <h2>{props.name}</h2>
        <div>
          <span className="sp">qty</span> : {props.qty} ||{" "}
          <span className="sp">size</span> : {props.size}
        </div>
        <p>
          <span className="sp">Price</span> : {props.price}
        </p>
      </div>
    </div>
  );
}

export default OrderCard;
