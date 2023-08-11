import { useContext, useEffect, useState } from "react";
import CartList from "../CartList/CartList";
import CustomerInfo from "../CustomerInfo/CustomerInfo";
import ShippingInfo from "../ShippingInfo/ShippingInfo";
import { OrderContext, Shipping, Address } from "../../context/OrderContext";
import { AuthContext } from "../../context/UserContext";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  const { createOrder } = useContext(OrderContext)!;
  const { user } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext)
  
  const navigate = useNavigate();
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [orderComponent, setOrderComponent] = useState<JSX.Element>(<CartList />);
  const [selectedDelivery, setSelectedDelivery] = useState<Shipping | undefined>();
  const [customerAddress, setCustomerAddress] = useState<Address>({
    street: "",
    zipcode: "",
    city: "",
    country: ""
  })
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleSelectDelivery = (delivery: Shipping) => {
    setSelectedDelivery(delivery);
  };
  const components = [<CartList />, <CustomerInfo customerAddress={customerAddress} setCustomerAddress={setCustomerAddress} />, <ShippingInfo onSelectDelivery={handleSelectDelivery} selectedDelivery={selectedDelivery} />];

  const callNextComponent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  const callPreviousComponent = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1) % components.length);
  };

  useEffect(() => {
    const orderComponent = components[currentIndex];
    setOrderComponent(orderComponent);
  }, [currentIndex, selectedDelivery]);


  const handlePlaceOrder = async () => {
    setIsLoading(true);
    if (user) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000)); //Simulate 3 sec loading
        
        await createOrder({
          orderItems: cartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity
          })),
          deliveryAddress: customerAddress,
          shippingMethod: selectedDelivery?._id || "",
        });
        clearCart()
        navigate('/confirmation');
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Please log in");
    }
  };

  const isCustomerAddressValid = (): boolean => {
    return Object.values(customerAddress).every((value) => value.trim() !== "");
  };

  const renderBtn = (): JSX.Element | null => {
    if (currentIndex === 0) {
      return <button onClick={callNextComponent} disabled={cartItems.length === 0}>Nästa</button>;
    } else if (currentIndex === 1) {
      return (
        <>
          <button onClick={callNextComponent} disabled={!user || !isCustomerAddressValid()}>Nästa</button>
          <button onClick={callPreviousComponent}>Föregående</button>
        </>
      );
    } else if (currentIndex === 2) {
      return (
        <>
          <button onClick={handlePlaceOrder} disabled={!selectedDelivery || cartItems.length === 0}>Lägg order</button>
          <button onClick={callPreviousComponent}>Föregående</button>
        </>
      );
    }
    return null;
  };

  return (
    <div className="checkout__container">
      <h1>Checkout</h1>
      <div className="checkout-headings">
        <h1 className={currentIndex === 0 ? "active" : ""}>Cart</h1>
        <h1 className={currentIndex === 1 ? "active" : ""}>Customer info</h1>
        <h1 className={currentIndex === 2 ? "active" : ""}>Shipping</h1>
      </div>
      <div className="order-info-container">{isLoading ? <Loader /> : orderComponent}</div>
      {!isLoading && renderBtn()}
    </div>
  );
};

export default Checkout;