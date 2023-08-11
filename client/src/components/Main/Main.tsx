import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react"
import ProductList from "../ProductList/ProductList";
import ProductDetails from "../ProductDetails/ProductDetails";
import Checkout from "../Checkout/Checkout";
import Contact from "../Contact/Contact";
import OrderConfirmation from "../OrderConfirmation/OrderConfirmation";
import UserPage from "../UserPage/UserPage";
import Admin from "../Admin/Admin";
import AdminProductDetails from "../AdminProductDetails/AdminProductDetails";
import AdminNewProduct from "../AdminNewProduct/AdminNewProduct";
import { AuthContext } from "../../context/UserContext";
import CreateUserPage from "../CreateUserPage/CreateUserPage";

const Main = () => {

  const { user } = useContext(AuthContext)

  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/registeruser" element={<CreateUserPage />} />

        {user?.isAdmin ? (
          <>
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/admin/product/create" element={<AdminNewProduct />} />
            <Route path="/admin/product/:id" element={<AdminProductDetails />} />
          </>
        ) : (
          <Route path="/admin/*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
};

export default Main;
