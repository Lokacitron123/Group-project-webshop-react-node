import { useContext } from "react";
import "./ShippingInfo.css";
import { OrderContext, Shipping } from "../../context/OrderContext";

interface ShippingInfoProps {
  onSelectDelivery: (delivery: Shipping) => void;
  selectedDelivery: Shipping | undefined;
}

const ShippingInfo = ({ onSelectDelivery, selectedDelivery }: ShippingInfoProps) => {
  const { shipping } = useContext(OrderContext)

  const selectDeliveryClick = (delivery: Shipping) => {
    onSelectDelivery(delivery);
  };
  
  return (
    <div className="shipping__container">
      <div className="shipping-list">
        {shipping.map((delivery) => {

          const formatDeliveryDateTime = (deliveryTimeInHours: number): string => {
            const currentDateTime = new Date();
            const deliveryDateTime = new Date(currentDateTime.getTime() + deliveryTimeInHours * 3600000);

            const formattedDate = deliveryDateTime.toLocaleDateString();
            const formattedTime = deliveryDateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            return `${formattedDate}, ${formattedTime}`;
          };

          return(
          <div
            key={delivery._id}
            onClick={() => {selectDeliveryClick(delivery)} }
            className={selectedDelivery?._id === delivery._id ? "shipping-card selected" : "shipping-card"}
          >
            <h1>{delivery.company}</h1>
            <p>Pris: {delivery.price}kr</p>
            <p>Leverans: {formatDeliveryDateTime(delivery.deliveryTimeInHours)}</p>
          </div>
        )
        })}
      </div>
    </div>
  );
};

export default ShippingInfo;