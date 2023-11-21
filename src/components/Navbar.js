import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Model from "../Model";
import Cart from "./Cart";
import { useStateContext } from "./ContextReducer";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const data = useStateContext();
  const length = data === undefined || data === null ? 0 : data.length;

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <Link style={{ fontWeight: "600" }} className="navbar-brand" to="/">
          FOODIE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {localStorage.getItem("token") ? (
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/order">
                  My orders
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>
          )}
        </div>
        {localStorage.getItem("token") ? (
          <div className="d-flex">
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="btn bg-white text-primary position-relative"
            >
              Cart
              {length === 0 ? (
                <></>
              ) : (
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                  {length}
                </span>
              )}
            </button>
            <Model isOpen={isOpen} onClose={() => setOpen(false)}>
              {" "}
              <Cart />
            </Model>
            <span style={{ width: "4px" }}></span>
            <button
              onClick={logoutHandler}
              className="btn bg-white text-danger"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="d-flex">
            <Link className="btn bg-white text-primary" to="/login">
              Login
            </Link>
            <span style={{ width: "4px" }}></span>
            <Link className="btn bg-white text-primary" to="/signup">
              Signup
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
