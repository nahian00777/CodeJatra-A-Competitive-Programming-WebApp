import React, { useState } from "react";
import "./login.css";
import myImage from "../../assets/images/panda1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message) => {
    if (message) {
      alert(message);
    }
  };

  const handleLoginSubmit =async (e) => {
    e.preventDefault();
    // Handle login form submission here
    try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/login",
          {
            username,
            password,
          },
          {
            withCredentials: true, // Include credentials (cookies) in requests
          }
        );
  
        if (response.status === 200) {
            setAlertMessage("Login successful");
            showAlert(alertMessage);
          // Cookies are automatically handled by the browser
          // Redirect or update UI as needed
        } else {
            setAlertMessage("Login failed");
            showAlert(alertMessage);
        }
      } catch (error) {
        setAlertMessage("Error logging in");
        showAlert(alertMessage);
        console.error("Error logging in:", error);
      }


    setAlertMessage("Login successful!");
   
  };

  return (
    <div className="wrapper">
      <Link to='/'>
        <span className="icon-close">
          <ion-icon name="close">X</ion-icon>
        </span>
      </Link>
      <div className="form-box Login">
        <img
          src={myImage}
          alt="notfound"
          style={{
            maxHeight: "100vh", // Makes the image's height cover the viewport
            maxWidth: "100vw", // Makes the image's width cover the viewport
            objectFit: "cover", // Ensures the image covers the space while maintaining aspect ratio
            top: "0",
            left: "0",
            width: "80%", // Sets width to fill the container
            height: "100%", // Sets height to fill the container
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
              <input type="checkbox" />Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              height: '45px',
              background: '#3AC8BC',
              outline: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1em',
              color: 'white',
              fontWeight: '500',
            }}
          >
            Login
          </button>

          <div className="login-register">
            <p>
              Don't have an account?
              <Link to='/register' className="register-link">
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
