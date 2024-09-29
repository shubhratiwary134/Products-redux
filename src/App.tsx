import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "./redux/productSlice";
import Categories from "./Components/Categories";
import Products from "./Components/Products";
import { RootState, AppDispatch } from "./redux/store";
import { IoSearch } from "react-icons/io5";

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
    params.set("q", query);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  return (
    <div className="App">
      <div className="border-2 m-10 w-1/2 p-2 flex justify-between items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full focus:outline-none"
        />
        <IoSearch />
      </div>

      <Categories />
      <Products />
    </div>
  );
};

export default App;
