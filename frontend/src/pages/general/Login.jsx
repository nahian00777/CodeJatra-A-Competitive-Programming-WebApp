import React, { useState, useEffect } from "react";
import "./login.css";
import myImage from "../../assets/images/panda1.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setHandle1, setUsername1 } from '../../redux/userSlice.jsx'; // Adjust the import path


const Login = () => {
  const [username, setUsername] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showAlert = (message) => {
    if (message) {
      alert(message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        { username, password, handle },
        { withCredentials: true }
      );

      if (response.status === 200) {
        
        setAlertMessage("Login successful");
        showAlert("Login successful");
        console.log(handle);
        dispatch(setUsername1(username)); // Set the username in Redux store
        dispatch(setHandle1(handle)); // Set the handle in Redux store

        navigate("/user/duel");
      } else {
        setAlertMessage("Login failed");
        showAlert("Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Username Or Password Not Correct";
      setAlertMessage(errorMessage);
      showAlert(errorMessage);
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="wrapper">
      <Link to="/">
        <span className="icon-close">
          <ion-icon name="close">X</ion-icon>
        </span>
      </Link>
      <div className="form-box Login">
        <img
          src={myImage}
          alt="notfound"
          style={{
            maxHeight: "100vh",
            maxWidth: "100vw",
            objectFit: "cover",
            top: "0",
            left: "0",
            width: "80%",
            height: "100%",
          }}
        />

        <form onSubmit={handleLoginSubmit}>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              required
            />
            <label>Handle</label>
          </div>
          <div className="input-box">
            <span className="icon2" id="LOCKHIDDEN">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              height: "45px",
              background: "#3AC8BC",
              outline: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1em",
              color: "white",
              fontWeight: "500",
            }}
          >
            Login
          </button>

          <div className="login-register">
            <p>
              Don't have an account?
              <Link to="/register" className="register-link">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
