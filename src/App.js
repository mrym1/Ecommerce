import React from "react";
import "./App.css";
import ProductPage from "./ProductPage";
import LandingPage from "./LandingPage";
import Cart from "./CartItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const LandingPage = import("./LandingPage");
  // const ProductPage = import("./ProductPage");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LandingPage/>} />
        <Route path="/cart" element={ <Cart/>} />
        <Route path="/:productBrand/:productName" element={ <ProductPage/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
