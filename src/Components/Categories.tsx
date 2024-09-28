import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setCategory } from "../redux/productSlice";
import { RootState, AppDispatch } from "../redux/store";

const Categories: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categories, selectedCategory, loading } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySelect = (slug: string) => {
    dispatch(setCategory(slug));
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="categories">
      <button onClick={() => handleCategorySelect("")}>All Categories</button>
      {categories.length > 0 ? (
        categories.map((category) => (
          <button
            key={category.slug} // Use the slug as a unique key
            onClick={() => handleCategorySelect(category.slug)} // Use slug to select category
            className={category.slug === selectedCategory ? "selected" : ""}
          >
            {category.name} {/* Display the category name */}
          </button>
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default Categories;
