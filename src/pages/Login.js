import { Alert, AlertTitle } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar"

function Login() {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });
    const statuss = await response.json();
    console.log(statuss);
    setIsLoading(false);
    if (statuss.success) {
      localStorage.setItem("token", statuss.token);
      localStorage.setItem("email", userData.email);
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
      {isLoading === true ? <Loader></Loader> : <></>}
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
          <button type="submit" className="m-3 btn btn-primary">
            Login
          </button>
          <Link to={"/signup"} className="m-3 btn btn-danger">
            Create a account?
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
