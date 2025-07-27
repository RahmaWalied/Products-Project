import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="min-h-[50vh] w-full  text-center p-4">
        <h1 className="text-6xl font-bold text-pink-700 dark:text-gray-100 mb-4">
          No Results
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn't find any products matching your search.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-pink-700 text-white rounded-full hover:bg-pink-800 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
