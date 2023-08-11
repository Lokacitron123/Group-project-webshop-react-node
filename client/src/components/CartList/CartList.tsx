import { useContext } from "react";
import "./CartList.css";
import { CartContext } from "../../context/CartContext";

const CartList = () => {
  const { cartItems, addToCart, productDecrement } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = item.product.price * item.quantity;
    return total + itemPrice;
}, 0);

  if (cartItems.length <= 0) {
    return <div className="empty">
      <p>Kundkorgen är tom</p>
      </div>;
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Pris</th>
            <th>Antal</th>
            <th>Åtgärd</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => (
            <tr key={cartItem.product._id}>
              <td className="product_data">
                <img src={cartItem.product.image} alt="Product image" />
                <p>{cartItem.product.title}</p>
              </td>
              <td>
                <p>{cartItem.product.price} kr</p>
              </td>
              <td>
                <p>{cartItem.quantity}</p>
              </td>
              <td className="product_action">
                <button onClick={() => addToCart(cartItem.product._id, 1)}>Lägg till</button>
                <button onClick={() => productDecrement(cartItem.product._id, 1)}>Ta bort</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary">
        <div className="row">
          <p>Total</p>
          <p>{totalPrice} SEK</p>
        </div>
      </div>
    </div>
  );
};

export default CartList;