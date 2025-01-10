import React, { useEffect, useState } from "react";
import { FaHeart, FaComment, FaShareAlt, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the username from localStorage
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);
  const posts = [
    {
      id: 1,
      title: "Sunset at the Beach",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhY2h8ZW58MHx8MHx8fDA%3D",
      description: "A beautiful sunset at the beach. The colors are mesmerizing!",
      likes: 120,
      comments: 15,
    },
    {
      id: 2,
      title: "Mountain Adventure",
      image: "https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW5zfGVufDB8fDB8fHww",
      description: "Hiking up the mountains with friends is the best therapy.",
      likes: 200,
      comments: 30,
    },
    {
      id: 3,
      title: "City Lights",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D",
      description: "Exploring the city at night is an unforgettable experience.",
      likes: 180,
      comments: 20,
    },
    {
      id: 4,
      title: "Majestic Temple at Dawn",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D",
      description: "The temple stands tall against the early morning sky, bathed in the warm golden light of the rising sun.",
      likes: 180,
      comments: 20,
    },
    {
      id: 5,
      title: "Morning Coffee",
      image: "https://media.istockphoto.com/id/1467199060/photo/cup-of-coffee-with-smoke-and-coffee-beans-on-old-wooden-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=YJZXeiAcr9Z-Q837HDy4uzJj7mSA1loVA8xMB5RXcCs=",
      description: "A steaming cup of coffee resting on a wooden table, with the morning sunlight streaming through the window.",
      likes: 180,
      comments: 20,
    },
    {
      id: 6,
      title: "Travel Memories",
      image: "https://media.istockphoto.com/id/1416018492/photo/teenager-indian-girl-hiking-on-mountain-with-backpack-in-manali-himachal-pradesh-india-female.webp?a=1&b=1&s=612x612&w=0&k=20&c=mzLVftJ6cgcpbfH9u_fbfj3n-8Gtju43wzSyyV2SxMs=",
      description: "A snapshot of a breathtaking view from a mountain peak, with winding roads and lush green valleys below.",
      likes: 180,
      comments: 20,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white px-6 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="InstaSphere Logo" className="w-12 h-12 rounded-[50%] mr-4" />
            <h1 className="text-2xl font-extrabold">InstaSphere</h1>
          </div>
          <div className="flex items-center space-x-4">
          <FaUserCircle className="w-8 h-8 text-white cursor-pointer" />
            <div className="text-sm font-medium">{username}</div>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={()=>{
                localStorage.removeItem("username"); // Remove username from localStorage
                navigate("/"); 
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">Welcome to <span className="font-extrabold">InstaSphere</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dynamic Posts */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                {/* Interaction Icons */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1 cursor-pointer">
                      <FaHeart />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer">
                      <FaComment />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer">
                      <FaShareAlt />
                      <span>Share</span>
                    </div>
                  </div>
                  <button className="text-blue-500 font-medium hover:underline">
                    View Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 InstaSphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
