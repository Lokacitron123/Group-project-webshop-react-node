import { Link } from "react-router-dom";
import "./AdminProductCard.css"

interface AdminProduct {
    _id: string, 
    title: string,
    image: string,
    inStock: number
}

const AdminProductCard = ({ _id, title, image, inStock}: AdminProduct) => {
    return (
        <div key={_id} className="adminProductCard__container">
            <div className="admin-product-card-image">
                <img src={image}/>
            </div>
            <div className="admin-product-info">
                <h2>{title}</h2>
                <p>I lager: {inStock}</p>
                <Link to={`/admin/product/${_id}`} key={_id}><button>Redigera</button></Link>
            </div>
        </div>
    );
  };
  
  export default AdminProductCard;