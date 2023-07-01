import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Authentication(props) {
  // state variables
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const path = props.path;
  const navigate = useNavigate();

  // event handlers
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
        console.log({ login, password })
      const response = await axios.post(`http://localhost:3001/v1/${props.path}`, { login, password });
      const { user, jwt } = response.data;
      setIsAuthenticated(true);
      localStorage.setItem("token", jwt);
      localStorage.setItem("userId", user.id)
      navigate(-1)
    } catch (error) {
      // handle error
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        console.log({ login, password })
      const response = await axios.post(`http://localhost:3001/v1/${props.path}`, { firstName, lastName, username, password, email });
      const { user, jwt } = response.data;
      setIsAuthenticated(true);
      navigate("/signin")
    } catch (error) {
      // handle error
    }
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
      setLogin(value);
  };
  const handleChangePass = (e) => {
    const { name, value } = e.target;
      setPassword(value);
  };
  const handleChangeFirstName = (e) => {
    const { name, value } = e.target;
      setFirstName(value);
  };
  const handleChangeLastName = (e) => {
    const { name, value } = e.target;
      setLastName(value);
  };
  const handleChangeUsername = (e) => {
    const { name, value } = e.target;
      setUsername(value);
  };
  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
      setEmail(value);
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" styles="align: center" onSubmit={(path == "signin")? handleSignin : handleSignup}>
        <div className="Auth-form-content">
          { (path == "signin")? <h3 className="Auth-form-title">Sign In</h3> : <h3 className="Auth-form-title">Sign Up</h3>}
          { (path == "signup")? <div className="form-group mt-3">
            <label>First Name</label>
            <input
              className="form-control mt-1"
              placeholder="Enter first name"
              onChange={handleChangeFirstName}
            />
          </div> : <></>}
          { (path == "signup")? <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              className="form-control mt-1"
              placeholder="Enter last name"
              onChange={handleChangeLastName}
            />
          </div> : <></>}
          {(path == "signin")?<div className="form-group mt-3">
            <label>login (email or username)</label>
            <input
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={handleChangeLogin}
            />
          </div>:<div className="form-group mt-3">
            <label>username</label>
            <input
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={handleChangeUsername}
            />
          </div>}
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handleChangePass}
            />
          </div>
          { (path == "signup")? <div className="form-group mt-3">
            <label>E-mail</label>
            <input
              className="form-control mt-1"
              placeholder="Enter last name"
              onChange={handleChangeEmail}
            />
          </div> : <></>}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Create new Account - <a href="/signup">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  )
}