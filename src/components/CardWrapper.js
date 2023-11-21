import React from "react";

function CardWrapper(props) {
  return (
    <div className="row px-5 row-cols-1 row-cols-md-4 g-4 mt-0 mb-5">
      {props.children}
    </div>
  );
}

export default CardWrapper;
