import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useNavigate } from "react-router";
import "./loginSignup.css";
export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null)
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

    let userDetails = { name: state.name, username: state.username, email: state.email, password: state.password, photo: file }
    const data = new FormData()
    data.append("image", file)
    data.append("name", state.name)
    data.append("email", state.email)
    data.append("password", state.password)
    data.append("username", state.username)
    let obj = await axios.post("http://localhost:4500/signup", data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
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
      <input type="file" name="profile" accept="image/*" onChange={e => {
        const fileUpload = e.target.files[0]
        console.log();
        setFile(fileUpload)
      }} />

      <button className="btn btn-danger" onClick={submitButton} >
        submit
      </button>
    </div>
  );
}
