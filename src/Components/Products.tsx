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
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-bold">Price: ${product.price}</p>
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading more products...</p>}
    </div>
  );
};

export default Products;
