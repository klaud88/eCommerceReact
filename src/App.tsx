import { Route, Routes } from "react-router";
import "./App.css";
import MainPage from "./Components/mainPage";
import ProductPage from "./Components/productPage";
import Page404 from "./Components/Page404";
import Cart from "./Components/cart";
import { useState } from "react";
import UserContext from "./Components/context/UserContext";

function App() {
  const [search, setSearch] = useState("dsf");

  return (
    <>
      <UserContext.Provider
        value={{
          search,
          setSearch,
        }}
      >
        <div className="mainContainer">
          <div id="productGrid">
            <MainPage />
          </div>

          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<ProductPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
