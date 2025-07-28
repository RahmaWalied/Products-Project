import React, { useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Pages/Products/Layout/Layout";
import Products from "./Pages/Products/Products";
import ProductDetails from "./Pages/Products/ProductDetails/ProductDetails";
import NotFound from "./Pages/Products/NotFound/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleMode() {
    setDarkMode(!darkMode);
  }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout darkMode={darkMode} toggleMode={toggleMode} />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound/>,
},
]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
