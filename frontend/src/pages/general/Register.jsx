import React, { useState } from "react";
import myImage from "../../assets/images/panda1.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
    handle: "",
    photo: null,
    termsAccepted: false,
  });
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setAlertMessage("You must agree to the terms and conditions.");
      return;
    }

    if (
      formData.fullName &&
      formData.email &&
      formData.password &&
      formData.username &&
      formData.handle
    ) {
      setLoading(true);
      try {
        const form = new FormData();
        form.append("fullName", formData.fullName);
        form.append("email", formData.email);
        form.append("password", formData.password);
        form.append("username", formData.username);
        form.append("handle", formData.handle);
        if (formData.photo) form.append("avatar", formData.photo);
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${apiUrl}/api/v1/users/register`,
          {
            method: "POST",
            body: form,
          },
          { withCredentials: true }
        );

        const result = await response.json();
        if (response.ok) {
          setAlertMessage("Registration successful!");
          navigate("/login");
        } else {
          setAlertMessage(result.message || "Something went wrong.");
        }
      } catch (error) {
        setAlertMessage("Error during registration.");
      } finally {
        setLoading(false);
      }
    } else {
      setAlertMessage("Please fill in all required fields.");
    }
  };

  return (
    <div className="register-form">
      <img
        src={myImage}
        alt="notfound"
        style={{
          maxHeight: "100vh", // Makes the image's height cover the viewport
          maxWidth: "100vw", // Makes the image's width cover the viewport
          objectFit: "cover",
          transform: "translate(30%, -10%)", // Ensures the image covers the space while maintaining aspect ratio
          top: "0",
          left: "0",
          width: "60%", // Sets width to fill the container
          height: "60%", // Sets height to fill the container
        }}
      />
      {alertMessage && <p className="alert-message">{alertMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <label>Full Name</label>
        </div>
        <div className="input-box">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Username</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            name="handle"
            value={formData.handle}
            onChange={handleChange}
            required
          />
          <label>Codeforces Handle</label>
        </div>
        <div className="input-box">
          <input type="file" name="photo" onChange={handleChange} />
          <label>Profile Photo</label>
        </div>
        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            Agree to terms and conditions
          </label>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="login-register">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="register-link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
