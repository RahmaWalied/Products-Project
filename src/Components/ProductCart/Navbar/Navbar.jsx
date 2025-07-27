import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";

export default function Navbar({ darkMode, toggleMode }) {
  return (
<nav className="dark:bg-black bg-gray-100 fixed top-0 left-0 w-full z-20 p-4 shadow-md dark:shadow-gray-300 transition-colors duration-300">
  <div className="container mx-auto flex items-center justify-between">
    {/* Cart icon */}
    <div className="text-2xl dark:text-white text-pink-700">
      <FaShoppingCart />
    </div>

    {/* Logo in center */}
    <Link to="/" className="text-3xl font-bold text-center dark:text-white text-pink-700">
      Product Gallery
    </Link>

    {/* Dark Mode toggle */}
    <button
      onClick={toggleMode}
      className=" text-pink-700 dark:text-yellow-500 text-2xl cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  </div>
</nav>

  );
}
