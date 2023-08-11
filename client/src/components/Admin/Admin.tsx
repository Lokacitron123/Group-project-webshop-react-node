import AdminOrderList from "../AdminOrderList/AdminOrderList";
import AdminProductList from "../AdminProductList/AdminProductList";
import "./Admin.css"
import { useState } from "react"

const Admin = () => {

  const [selectedList, setSelectedList] = useState("productList")

  const handleProductList = () => {
    setSelectedList("productList")
  }

  const handleOrderList = () => {
    setSelectedList("orderList")
  }

  return (
    <div className="admin__container">
      <h1>Admin</h1>

      <div className="admin-btn">
        <button onClick={handleProductList}>Products</button>
        <button onClick={handleOrderList}>Orders</button>
      </div>

      {selectedList === "productList" && <AdminProductList />}
      {selectedList === "orderList" && <AdminOrderList />}
    </div>
  );
};

export default Admin;
