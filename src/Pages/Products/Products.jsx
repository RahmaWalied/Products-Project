import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ProductCart from '../../Components/ProductCart/ProductCart';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import NotFound from './NotFound/NotFound';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const productsSectionRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products")
      .then(res => {
        setProducts(res.data);
        setDisplayProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      let filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (sortType === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortType === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortType === 'name-asc') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      }

      setDisplayProducts(filtered);
      setCurrentPage(1);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, sortType, products]);

  const handleScroll = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > window.innerHeight / 1.2);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = displayProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(displayProducts.length / productsPerPage);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        <img
          src="/herobg.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-lg md:text-2xl mb-6">Find the best products at unbeatable prices</p>
          <button
            onClick={handleScroll}
            className="bg-white dark:bg-black text-black dark:text-white font-semibold py-2 px-6 rounded-full hover:bg-gray-200 dark:hover:text-black transition cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      </div>

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-pink-700 text-white dark:bg-white dark:text-black p-3 rounded-full shadow-lg cursor-pointer hover:bg-pink-600 hover:dark:text-white hover:dark:bg-gray-600 transition"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        <h2
          ref={productsSectionRef}
          className="text-3xl md:text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-900 via-pink to-pink-950 drop-shadow-[0_0_10px_pink] dark:from-gray-200 dark:via-gray-100 dark:to-gray-50 dark:drop-shadow-none scroll-mt-24"
        >
          <span className="inline-block pb-2">Our Products</span>
        </h2>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 max-w-xl mx-auto px-4">
          <input
            type="text"
            placeholder="Search Products By Name"
            className="w-full md:w-80 p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-300 transition placeholder-pink-900 dark:placeholder-white text-gray-700 dark:text-white text-center cursor-pointer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full md:w-56 p-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-300 transition bg-white text-pink-900 dark:bg-black dark:text-white dark:border-white cursor-pointer"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: productsPerPage }).map((_, index) => (
              <div
                key={index}
                className="h-72 w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
              />
            ))
          ) : currentProducts.length === 0 ? (
<div className="flex flex-col items-center justify-center">
  <NotFound />
</div>


          ) : (
            currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCart product={product} />
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full font-semibold border 
                  ${currentPage === i + 1
                    ? "bg-pink-700 text-white dark:bg-gray-400 cursor-pointer"
                    : "bg-white dark:bg-black text-pink-700 dark:text-white border-pink-300 dark:border-white"}
                  hover:bg-pink-500 hover:text-white cursor-pointer hover:dark:bg-gray-400 transition`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
