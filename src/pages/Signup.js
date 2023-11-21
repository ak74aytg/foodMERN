import { Alert, AlertTitle } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar"

function Signup() {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        location: userData.location,
      }),
    });

    const statuss = await response.json();
    console.log(statuss);
    setIsLoading(false);
    if (statuss.success) {
      localStorage.setItem("token", statuss.token);
      localStorage.setItem("email", userData.email)
      navigate("/");
    }
    setStatus(statuss.errors);
  };

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Navbar />
      {
        isLoading===true ? (
          <Loader></Loader>
        ) : (
          <></>
        )
      }
      {status !== "" ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>{status}</strong>
        </Alert>
      ) : (
        <></>
      )}
      <div style={{position:'relative', marginTop:'5rem'}} className="container cr">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              onChange={changeHandler}
              value={userData.name}
              type="text"
              className="form-control"
              name="name"
              id="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              onChange={changeHandler}
              value={userData.email}
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={changeHandler}
              value={userData.password}
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              onChange={changeHandler}
              value={userData.location}
              type="text"
              name="location"
              className="form-control"
              id="location"
            />
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to={"/login"} className="m-3 btn btn-danger">
            Already a user?
          </Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
