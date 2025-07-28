import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./../../../Components/ProductCart/Navbar/Navbar";

export default function Layout({ darkMode, toggleMode }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // مدة التحميل عند الانتقال

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Navbar darkMode={darkMode} toggleMode={toggleMode} />

{loading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80">
    <svg
      className={`animate-spin h-10 w-10 ${darkMode ? "text-white" : "text-pink-600"}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8z"
      ></path>
    </svg>
  </div>
)}


      <Outlet />
    </>
  );
}
