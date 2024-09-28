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
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading
    ) {
      dispatch(incrementPage());
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  if (loading && products.length === 0) return <p>Loading products...</p>;

  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </div>
      ))}
      {loading && <p>Loading more products...</p>}
    </div>
  );
};

export default Products;
