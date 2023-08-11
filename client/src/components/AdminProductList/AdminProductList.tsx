import "./AdminProductList.css"
import { useProductContext } from "../../context/ProductContext";
import AdminProductCard from "../AdminProductCard/AdminProductCard";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const AdminProductList = () => {

    const { products } = useProductContext()

    return products ? (
      <div className="adminProductList__container">
        <Link to={"/admin/product/create"}><button>Create product</button></Link>
        <div className="admin-product-list-grid">
            {products.map((product) => (
                <AdminProductCard 
                    key={product._id}
                    _id={product._id}
                    title={product.title}
                    image={product.image}
                    inStock={product.inStock}
                />
            ))}
        </div>
      </div>
    ) : <Loader />
  };
  
  export default AdminProductList;