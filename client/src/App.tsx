import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./context/UserContext";
import ProductProvider from "./context/ProductContext";
import "./index.css";
import { OrderProvider } from "./context/OrderContext";
import { CartProvider } from "./context/CartContext";
import UserMenu from "./components/UserMenu/UserMenu";

function App() {
  return (
    <div className="root-div">

      <AuthProvider>
        <ProductProvider>
          <OrderProvider>
            <CartProvider>
              <Header />
              <UserMenu />
              <Main />
              <Footer />
            </CartProvider>
          </OrderProvider>
        </ProductProvider>
      </AuthProvider>

    </div>
  );
}

export default App;
