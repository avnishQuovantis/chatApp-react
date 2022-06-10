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
    status: "busy",
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
    data.append("status", state.status)
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
    <div className="signupContainer">
      <div className="signup">
        <div className="signup__left">
          <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />

        </div>
        <div className="signup__right ">
          <h1 data-testid="signupTitle">SignUp</h1>
          <div className="signup__inputsContainer">
            <i class="bi bi-person"></i>
            <input
              name="name"
              type="text"
              value={state.name}
              class="signup__inputs"
              placeholder="Name"
              onChange={changeInput}
            />
          </div>
          <div className="signup__inputsContainer">
            <i class="bi bi-person-bounding-box"></i>
            <input
              name="username"
              type="text"
              value={state.username}
              class="signup__inputs"
              placeholder="username"
              onChange={changeInput}
            />

          </div>
          <div className="signup__inputsContainer">
            <i class="bi bi-envelope-fill"></i>
            <input
              name="email"
              type="email"
              value={state.email}
              class="signup__inputs"
              placeholder="email"
              onChange={changeInput}
            />
          </div>
          <div className="signup__inputsContainer">
            <i class="bi bi-shield-fill"></i>
            <input
              name="password"
              value={state.password}
              type="password"
              class="signup__inputs"
              placeholder="password"
              onChange={changeInput}
            />
          </div>
          <div className="signup__inputsContainer">
            <i class="bi bi-bookmarks-fill"></i>
            <input name="status"
              value={state.status}
              type="text"
              class="signup__inputs"
              placeholder="status"
              onChange={changeInput}
            />
          </div>
          <div class="signup__fileUpload" >
            <input type="file" id="signup__imageInput" accept='image/*'
              onChange={e => {
                const fileUpload = e.target.files[0]
                console.log();
                setFile(fileUpload)
              }} />
            <label for="signup__imageInput" className="btn btn-primary" ><i class="bi bi-image-fill"></i> FileUpload</label>
          </div>
          {/* <input type="file" name="profile" accept="image/*" onChange={e => {
            const fileUpload = e.target.files[0]
            console.log();
            setFile(fileUpload)
          }} /> */}

          <button className="btn btn-danger" onClick={submitButton} >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
