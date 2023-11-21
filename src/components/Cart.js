import React from "react";
import { useStateContext, useDispatchContext } from "./ContextReducer";

function Cart() {
  const data = useStateContext();
  const dispatch = useDispatchContext();
  const length = data === undefined || data === null ? 0 : data.length;
  const checkOutHandler = async () => {
    const response = await fetch("http://localhost:5000/api/checkOut", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        orders: [Date.now(), ...data],
      }),
    });
    const status = response.json();
    console.log(status);
    dispatch({
      type: "drop",
    });
  };

  return length === 0 ? (
    <div
      className="d-flex justify-content-center"
      style={{ fontSize: "large" }}
    >
      No record found!
    </div>
  ) : (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Size</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => {
            return (
              <tr key={food.id}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td
                  onClick={() => {
                    dispatch({ type: "delete", index: index });
                  }}
                >
                  <i
                    style={{ cursor: "pointer" }}
                    class="fa fa-trash"
                    aria-hidden="true"
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="btn bg-primary" onClick={checkOutHandler}>
        check out
      </button>
    </div>
  );
}

export default Cart;
