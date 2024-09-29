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
    <div className="flex flex-wrap justify-center gap-10 p-4 mx-20 bg-white shadow-2xl rounded-lg border-2 border-black">
      <button onClick={() => handleCategorySelect("")}>All Categories</button>
      {categories.length > 0 ? (
        categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategorySelect(category.slug)}
            className={
              category.slug === selectedCategory
                ? "text-green-800"
                : "hover:text-green-800"
            }
          >
            {category.name}
          </button>
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default Categories;
