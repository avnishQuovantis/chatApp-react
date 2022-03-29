import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useNavigate } from "react-router";
import "./loginSignup.css";
export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const changeInput = (e) => {
    // console.log(e.target.name,e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //   console.log(localStorage.getItem("abc@gmail.com")==null)
  const submitButton = async () => {
    let userDetails = { name: state.name, username: state.username, email: state.email, password: state.password }
    let obj = await axios.post("http://localhost:4500/signup", userDetails)
    let user = obj.data.user
    console.log(obj);
    if (user == null) {
      console.log("email is null");
      alert("this email already exist please try another email")
      navigate("/signup")
    } else {
      alert("Successfully signup")
      dispatch({ type: "signup", payload: obj.data });
      navigate("/");
    }
    setState({ name: "", username: "", email: "", password: "", address: "" });
  };
  return (
    <div className="login signup ">
      <h1 data-testid="signupTitle">SignUp</h1>
      <div>
        <h5> Name</h5>
        <input
          name="name"
          type="text"
          value={state.name}
          class="form-control"
          placeholder="fname"
          onChange={changeInput}
        />
      </div>
      <div>
        <h5>username</h5>
        <input
          name="username"
          type="text"
          value={state.username}
          class="form-control"
          placeholder="lname"
          onChange={changeInput}
        />

      </div>
      <div>
        <h5>Email</h5>
        <input
          name="email"
          type="email"
          value={state.email}
          class="form-control"
          placeholder="email"
          onChange={changeInput}
        />
      </div>
      <div>
        <h5>Password</h5>
        <input
          name="password"
          value={state.password}
          type="password"
          class="form-control"
          placeholder="password"
          onChange={changeInput}
        />
      </div>


      <button className="btn btn-danger" onClick={submitButton}>
        submit
      </button>
    </div>
  );
}
