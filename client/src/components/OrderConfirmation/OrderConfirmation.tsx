import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import { AuthContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import "./OrderConfirmation.css"

const OrderConfirmation = () => {

  const { lastOrder } = useContext(OrderContext)
  const { user } = useContext(AuthContext)
  const { products } = useProductContext()
  const { shipping } = useContext(OrderContext)

  const getProductById = (productId: string) => {
    return products.find((product) => product._id === productId)
  }

  const getShippingById = (shippingId: string) => {
    const selectedShipping = shipping.find((shipping) => shipping._id === shippingId)
    return selectedShipping?.company || ""
  }

  return (
  <div>
    {lastOrder ? (<div className="confirmation__container">
      <h3>Tack för din order {user?.firstName} 🎉</h3>

      <p>Vi har nu mottagit din order: {lastOrder?.orderNumber}</p>
      <p>Beställning har skapats: {lastOrder?.createdAt}</p>
      <p>Tack för att du valde leverans via: {getShippingById(lastOrder?.shippingMethod)}</p>
      <div>
        <h1>Leveransadress:</h1>
        <p>Street: {lastOrder?.deliveryAddress.street}</p>
        <p>Zipcode: {lastOrder?.deliveryAddress.zipcode}</p>
        <p>City: {lastOrder?.deliveryAddress.city}</p>
        <p>Country: {lastOrder?.deliveryAddress.country}</p>
      </div>
        <h1>Beställda produkter:</h1>
      <div className="confirmation-product-card-grid">
        {lastOrder?.orderItems.map((item) => {
          const product = getProductById(item.product)
          return (
            <div key={item.product} className="confirmation-product-card">
              <div className="confirmation-img-container">
                <img src={product?.image} alt={product?.title} />
              </div>
                <h2>{product?.title}</h2>
                <p>Quantity: {item.quantity}</p>
            </div>
          )
          })}
      </div>
      <p>Du kan nu använda följande rabattkod för att bjuda in en kompis <strong><em>DX18AB9</em></strong> för att få 10% rabatt på sin första beställlning 👍</p>
    </div>) : (<div className="confirmation-error">
      <p>Inga beställningar</p>
    </div>)
    }
  </div>
  );
};

export default OrderConfirmation;
