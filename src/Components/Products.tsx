import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, incrementPage } from "../redux/productSlice";
import { RootState, AppDispatch } from "../redux/store";

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, selectedCategory, page, searchTerm, loading } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, page, searchTerm }));
  }, [dispatch, selectedCategory, page, searchTerm]);

  const handleScroll = () => {
    console.log("Scrolling...");
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && // Adjust threshold
      !loading
    ) {
      console.log("Loading more products...");
      dispatch(incrementPage());
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  if (loading && products.length === 0)
    return <p className="text-center">Loading products...</p>;

  return (
    <div className="mx-auto my-10 px-4 py-8 shadow-2xl bg-white ">
      <h1 className="text-3xl font-bold mb-6 font-mono">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-2xl p-5 rounded-lg ">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-bold">Price: ${product.price}</p>
            <button className="bg-green-600 px-4 py-2 mt-4 text-white rounded-lg">
              Buy Now
            </button>
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading more products...</p>}
    </div>
  );
};

export default Products;
