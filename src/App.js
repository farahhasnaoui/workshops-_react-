import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./Components/AddProduct";
import UpdateProduct from "./Components/UpdateProduct";
import { fetchProducts } from "./redux/slices/productsSlice";
const Products = React.lazy(() => import("./Components/Products"));
const NotFound = React.lazy(() => import("./Components/NotFound"));
const NavbarComponent = React.lazy(() => import("./Components/Navbar"));
const ProductDetails = React.lazy(() => import("./Components/ProductDetails"));
const Cart = React.lazy(() => import("./Components/Cart"));


function App() {
  const dispatch = useDispatch();

  return (
    <>
      <Suspense fallback={<p>Chargement ...</p>}>
        <NavbarComponent />
        <Routes>
          <Route path="/products">
            <Route
              path="list"
              element={<Products />}
              loader={dispatch(fetchProducts())}
            />
            <Route path="add" element={<AddProduct />} />
            <Route path="update/:id" element={<UpdateProduct />} />
            <Route path=":id" element={<ProductDetails />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
