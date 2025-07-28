import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function ProductCart({ product }) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all  duration-300 cursor-pointer hover:-translate-y-1 z-0">
      {product.rating?.count > 300 && (
        <span className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md z-20">
          BEST SELLER
        </span>
      )}

      <div className="flex justify-center items-center h-48 mb-4 z-10 relative">
        <img
          src={product.image}
          alt={`product image ${product.title}`}
          className="h-full object-contain transform group-hover:scale-105 transition duration-300"
        />
        {/* layer card */}
        <div className="layer -translate-y-1/2 flex justify-center items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2">
          {/* icon (details) */}
          <Link
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="icon bg-pink-800 dark:bg-black opacity-100 translate-y-0 md:opacity-0 md:translate-y-20 md:group-hover:translate-y-0 md:group-hover:opacity-100 hover:bg-darkPrimary duration-1000 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
        </div>
      </div>

      <h3 className="text-center text-sm font-medium text-gray-800 min-h-[3rem] line-clamp-2 z-0">
        {product.title.split(" ").slice(0, 3).join(" ")}
      </h3>

      <div className="flex justify-between items-center mt-4 z-0">
        <span className="text-primary font-bold text-lg dark:text-pink-700">
          ${product.price}
        </span>
        <div className="flex items-center gap-1 text-yellow-500">
          <Star className="w-4 h-4 fill-yellow-400" />
          <span className="text-sm font-semibold">
            {product.rating?.rate ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
}
