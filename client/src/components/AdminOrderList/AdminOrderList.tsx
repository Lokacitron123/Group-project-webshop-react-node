import "./AdminOrderList.css"
import { useContext } from "react"
import { OrderContext } from "../../context/OrderContext";

const AdminOrderList = () => {
  const { orders, markAsShipped, setOrders } = useContext(OrderContext)

  const handleMarkAsShipped = async (orderId: string) => {
    const updatedOrders = orders.map((order) => {
      if (order._id === orderId) {
        return { ...order, shipped: true };
      }
      return order;
    });
  
    setOrders(updatedOrders)
  
    await markAsShipped(orderId)
  };

    return (
      <div className="adminOrderList__container">
        <h1>Orders</h1>
        <div className="admin-order-list-grid">
        {orders.map((order) => (
          <div key={order._id} className="admin-order-card">
            <p>Ordernummer: {order.orderNumber}</p>
            <p>Customer: {order.customer.firstName}</p>
            <p className={order.shipped ? "active" : "inactive"}>{order.shipped ? "Levererad" : "Pågående"}</p>
            {!order.shipped && <button onClick={() => handleMarkAsShipped(order._id)}>Avslutad</button>}
          </div>
        ))}
        </div>
      </div>
    );
  };
  
  export default AdminOrderList;
  