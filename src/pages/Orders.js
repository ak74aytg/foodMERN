import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderCard from "../components/OrderCard";

function Orders() {
  const [data, setData] = useState([]);

  const checkOrderHandler = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
        }),
      });
      const ordersData = await response.json();
      setData(ordersData.orders.reverse());
      console.log(ordersData.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    checkOrderHandler();
  }, []);

  return (
    <div>
      <Navbar />
      {data.length === 0 ? (
        <div>You have not ordered at anything!!</div>
      ) : (
        <>
          {data.map((orders) => {
            const options = { day: "2-digit", month: "short", year: "numeric" };
            const date2 = new Date(orders[0]).toLocaleString("en-GB", options);
            return (
              <div style={{ position: "relative", marginTop: "5rem" }}>
                <div className="Orderdate">{date2}</div>
                {orders.map((order, index) => {
                  let name;
                  let img;
                  let size;
                  let qty;
                  let price;
                  if (index !== 0) {
                    name = order.name;
                    img = order.img;
                    size = order.size;
                    qty = order.qty;
                    price = order.price;
                    return (
                      <div className="order">
                        <OrderCard
                          name={name}
                          img={img}
                          size={size}
                          qty={qty}
                          price={price}
                        />
                      </div>
                    );
                  }
                  return <></>;
                })}
                <hr></hr>
              </div>
            );
          })}
        </>
      )}
      <Footer />
    </div>
  );
}

export default Orders;
