import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardWrapper from "../components/CardWrapper";
import Card from "../components/Card";

function Home() {
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    getFood();
  }, []);

  const getFood = async () => {
    const response = await fetch("http://localhost:5000/api/food", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setCategory(data[0]);
    setItems(data[1]);
  };

  const searchItem = async (e) => {
    setSearched(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div style={{position:'relative', marginTop:'3rem'}} className="mb-2">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searched}
                  onChange={searchItem}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1613277367862-f8ef14db7748?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8YnVyZ2VyfHx8fHx8MTcwMDEyMDA5MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1626844131082-256783844137?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8cGFzdGF8fHx8fHwxNzAwMTIwMDIz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1604382355076-af4b0eb60143?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8cGl6emF8fHx8fHwxNzAwMTE5ODQ4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
                alt="Third slide"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            data-bs-target="#carouselExampleControls"
            type="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            data-bs-target="#carouselExampleControls"
            type="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
      {category.toString() !== [].toString() ? (
        category.map((categ) => {
          return (
            <div>
              <div className="categ" key={categ._id}>
                {categ.CategoryName}
              </div>
              <CardWrapper>
                {items.toString() !== [].toString() ? (
                  items
                    .filter(
                      (item) =>
                        item.CategoryName === categ.CategoryName &&
                        (item.name
                          .toLowerCase()
                          .includes(searched.toLowerCase()) ||
                          item.CategoryName.toLowerCase().includes(
                            searched.toLowerCase()
                          ))
                    )
                    .map((ele) => {
                      // console.log(ele);
                      return (
                        <Card
                          key={ele._id}
                          foodItem={{
                            'id':ele._id,
                            'name':ele.name,
                            'img':ele.img,
                            'description':ele.description
                          }}
                          foodOpt={ele.options[0]}
                        />
                      );
                    })
                ) : (
                  <div>nice</div>
                )}
              </CardWrapper>
              <hr></hr>
            </div>
          );
        })
      ) : (
        <div>data not stored</div>
      )}
      <Footer />
    </>
  );
}

export default Home;
