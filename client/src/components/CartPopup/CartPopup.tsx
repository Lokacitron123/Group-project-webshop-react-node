import "./CartPopup.css"
import { CartContext } from "../../context/CartContext";
import { useContext } from "react"
import { ImCross } from "react-icons/im"
import { MdRemoveShoppingCart } from "react-icons/md"
import { Link } from "react-router-dom"

interface CartPopupProps {
    closeCartPopup: () => void;
}

const CartPopup = ({ closeCartPopup }: CartPopupProps) => {
    const { cartItems, addToCart, productDecrement, clearCart } = useContext(CartContext)

    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = item.product.price * item.quantity;
        return total + itemPrice;
    }, 0);

    return (
        <div className="CartPopup__container">
            <div className="cart-item-header">
                <h1>Cart</h1>
                <ImCross onClick={closeCartPopup} />
            </div>
            <div className="cart-items-container">
                {cartItems.length > 0 ? cartItems.map((item) => (
                    <div key={item.product._id} className="cart-item-card">
                        <div className="cart-item-img">
                            <img src={item.product.image} alt={item.product.title} />
                        </div>
                        <div className="cart-item-details-wrapper">
                            <div className="cart-item-info">
                                <h1>{item.product.title}</h1>
                                <p>{item.product.price} kr</p>
                            </div>
                            <div className="cart-item-btns">
                                <p>{item.quantity}</p>
                                <button onClick={() => addToCart(item.product._id, 1)}>+</button>
                                <button onClick={() => productDecrement(item.product._id, 1)}>-</button>
                            </div>
                        </div>
                    </div>
                )) : (<div className="empty-cart">
                    <MdRemoveShoppingCart />
                </div>)}
            </div>
            <div className="cart-item-footer">
                <p>Total price: {totalPrice} kr</p>
                <div className="cart-item-footer-btns">
                    <Link to={"/checkout"}>
                        <button onClick={closeCartPopup} disabled={cartItems.length === 0}>Checkout</button>
                    </Link>
                    <button onClick={clearCart}>Clear cart</button>
                </div>
            </div>
        </div>
    )
}

export default CartPopup