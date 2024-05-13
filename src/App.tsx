import { Route, Routes } from "react-router";
import "./App.css";
import { UserContext } from "./Components/context/UserContext";
import MainPage from "./Components/mainPage";
import ProductPage from "./Components/productPage";
import Page404 from "./Components/Page404";
import Cart from "./Components/cart";

function App() {
  return (
    <>
      <div className="mainContainer">
        <div id="productGrid">
          <MainPage />
        </div>
        <UserContext.Provider value={{}}>
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<ProductPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
