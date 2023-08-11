import { ImCart } from "react-icons/im";
import "./CartIcon.css";
import CartPopup from "../CartPopup/CartPopup";
import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext";

const CartIcon = () => {
  const [showCartPopup, setShowCartPopup] = useState(false)
  const { cartItems } = useContext(CartContext)

  const handleShowCartPopup = () => {
    setShowCartPopup(!showCartPopup)
  }
  const handleCloseCartPopup = () => {
    setShowCartPopup(false)
  }

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-icon__container">
      <div className="cart-icon__content">
        <button onClick={handleShowCartPopup}><ImCart /></button>
        <span>{totalQuantity}</span>
      </div>
      <p>Kundvagn</p>
      {showCartPopup && <CartPopup closeCartPopup={handleCloseCartPopup} />}
    </div>
  );
};

export default CartIcon;
