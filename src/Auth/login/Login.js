import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAlbums, loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { setCookie } from "react-use-cookie";
import Register from "../register/Register";
import "./Login.css";
import { getImages } from "../../services/api";
import { useDispatch } from "react-redux";
import { addImage } from "../../Redux/Slices/ImageReducerSlice";
import { addAllAlbums } from "../../Redux/Slices/AlbumReducerSlice";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    validateEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{}':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must conatin a capital letter and atleast be 8 character long"
      );
    } else {
      setPasswordError("");
    }
  };

  const fetchImages = async () => {
    try {
      const imagesData = await getImages();
      dispatch(addImage(imagesData));
    } catch (error) {
      toast.error("Failed to fetch images", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const fetchAlbums = async () => {
    try {
      const response = await getAlbums();
      dispatch(addAllAlbums(response));
    } catch (error) {
      toast.error("Failed to fetch albums", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email: email, password: password });
      const userDetails = {
        userName: response?.user?.username,
        id: response?.user?._id,
      };
      setCookie("token", response.token, { path: "/" });
      setCookie("user", JSON.stringify(userDetails), { path: "/" });
      setTimeout(() => {
        (async () => {
          await fetchAlbums();
          await fetchImages();
          navigate("/");
        })();
      }, 1000);
      toast.success("Successfully loggedIn", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Login Failed", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="main-container">
      <div className="container LoginContainer">
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img
              src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
              className="frontimage"
              alt=""
            />
          </div>
          <div className="back">
            <img
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?w=2000"
              className="backimage"
              alt=""
            />
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form onSubmit={handleSubmit}>
                <div className="input-boxes">
                  <div className="d-flex flex-column  position-relative">
                    <div className="input-box mb-3">
                      <i className="fas fa-envelope" />
                      <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>
                    <div className="position-absolute errorDivemail">
                      {emailError && (
                        <span className="input-error">{emailError}</span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-column  position-relative">
                    <div className="input-box mb-5">
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="position-absolute errorDiv">
                      {passwordError && (
                        <span className="input-error">{passwordError}</span>
                      )}
                    </div>
                  </div>
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">
                    Don&apos;t have an account&#x3f;{" "}
                    <label htmlFor="flip">Register now</label>
                  </div>
                </div>
              </form>
            </div>
            <Register />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
