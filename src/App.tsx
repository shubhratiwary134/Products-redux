import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "./redux/productSlice";
import Categories from "./Components/Categories";
import Products from "./Components/Products";
import { RootState, AppDispatch } from "./redux/store";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { searchTerm } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search") || "";
    if (searchParam) {
      dispatch(setSearch(searchParam));
    }
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch(setSearch(query));

    const params = new URLSearchParams(window.location.search);
    params.set("search", query);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  return (
    <div className="App">
      <h1>Product Store</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
      />
      <Categories />
      <Products />
    </div>
  );
};

export default App;
