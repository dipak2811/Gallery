import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await loginUser(formData);
        console.log(response);
        const userDetails = {userName: response.user.username,id:response.user._id};
        console.log(userDetails);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(userDetails));
        navigate('/');
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
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
