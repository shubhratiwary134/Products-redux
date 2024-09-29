import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, incrementPage } from "../redux/productSlice";
import { RootState, AppDispatch } from "../redux/store";
import _ from "lodash";

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    products,
    selectedCategory,
    page,
    searchTerm,
    loading,
    totalProducts,
  } = useSelector((state: RootState) => state.product);

  const hasMoreProducts = products.length < totalProducts;

  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, page, searchTerm }));
  }, [dispatch, selectedCategory, page, searchTerm]);

  const handleScroll = useCallback(
    _.debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        hasMoreProducts
      ) {
        dispatch(incrementPage());
      }
    }, 300),
    [dispatch, loading, hasMoreProducts]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="mx-auto my-10 px-4 py-8 shadow-2xl bg-white border-black border-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-2xl p-5 rounded-lg border-black border-2"
          >
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-bold">Price: ${product.price}</p>
            <button className="bg-green-800 px-4 py-2 mt-4 text-white rounded-lg">
              Buy Now
            </button>
          </div>
        ))}
      </div>
      {loading && hasMoreProducts && (
        <p className="text-center mt-4">Loading more products...</p>
      )}
      {!hasMoreProducts && !loading && (
        <p className="text-center mt-4">No more products to load.</p>
      )}
    </div>
  );
};

export default Products;
