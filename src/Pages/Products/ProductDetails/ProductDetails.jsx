import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getProductDetails() {
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse max-w-4xl w-full px-6">
          <div className="w-full md:w-1/2 h-80 bg-gray-300 rounded-lg"></div>
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl p-4 mt-15">
      <h2
        className="    text-3xl md:text-5xl font-bold text-center mb-6 
    text-transparent bg-clip-text 
    bg-gradient-to-r from-pink-900 via-pink to-pink-950 
    drop-shadow-[0_0_10px_pink] 
    dark:from-gray-200 dark:via-gray-100 dark:to-gray-50
    dark:drop-shadow-none mt-5"
      >
        <span className="inline-block pb-2">Details</span>
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-contain rounded-xl p-4 "
          />
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h2
            className="text-3xl font-extrabold text-primary dark:text-pink-800
    "
          >
            {product.title}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Animated glowing price */}
          <p className="text-2xl font-bold text-pink-800 animate-pulse drop-shadow-[0_0_4px_#f472b6]">
            ${product.price}
          </p>

          <p className="text font-semibold text-pink-950">
            <span className="font-semibold text-lg text-gray-700">
              Category:{" "}
            </span>{" "}
            {product.category}
          </p>

          {/* Buttons*/}
          <div className="flex gap-4 mt-4">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-pink-400 hover:shadow-lg cursor-pointer">
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/products")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-gray-400 hover:shadow-lg cursor-pointer"
            >
              Back to Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
