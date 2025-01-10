// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Username: "",
    Email: "",
    Password: "",
    Bio: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const {Name, Username, Email, Password} = formData;
    if (!Name || !Username || !Email || !Password) {
      setError("All required fields must be filled.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/user/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.status == 200) {
        const  Username  = response.data.Username
        localStorage.setItem("username", Username);
        alert("Signup successful!");
        setError(""); // Clear error on success
        navigate("/home"); // Navigate to the home page
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Something went wrong.");
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="Name"
              placeholder="Enter your name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              name="Username"
              placeholder="Choose a username"
              value={formData.Username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="Enter your email"
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
              placeholder="Create a password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Bio</label>
            <textarea
              name="Bio"
              placeholder="Tell us about yourself (optional)"
              value={formData.Bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
