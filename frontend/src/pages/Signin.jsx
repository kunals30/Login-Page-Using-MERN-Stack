// src/pages/SignIn.jsx
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Username, Email, Password } = formData;
    if (!Username || !Email || !Password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/user/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        const  Username  = response.data.data.Username
        localStorage.setItem("username", Username);
        // console.log(response.data.data.Username);
        setError(""); // Clear error on success
        navigate("/home"); // Navigate to the home page
      } else {
        setError(response.data.message || "Signup failed.");
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Something went wrong.");
      setError(err.response?.data?.message || "Sign in failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign In</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              name="Username"
              placeholder="Enter your Username"
              value={formData.Username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="Email"
              name="Email"
              placeholder="Enter your Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="Password"
              placeholder="Enter your password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
