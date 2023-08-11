import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import { useEffect, useState } from "react";
import BuyProductBtn from '../BuyProductBtn/BuyProductBtn';
import DisabledBuyProductBtn from "../DisabledBuyProductBtn/DisabledBuyProductBtn";
import "./ProductDetails.css";
import { motion } from "framer-motion";




const ProductDetails = () => {

  const { fetchProduct, getProduct, products, getInstockText } = useProductContext();
  const { id } = useParams();
  const navigate = useNavigate();


  const [product, setProduct] = useState({
    "_id": "1",
    "title": "...",
    "price": 0,
    "description": "...",
    "image": "../img/none.jpg",
    "inStock": 0
  });

  useEffect(() => {

    async function getProd() {
      if (id === undefined) throw "No valid id"
      const product = await fetchProduct(id);
      setProduct(product)
    }
    const filteredProd = getProduct(id ?? "");
    filteredProd ? console.log("found") : console.log("not found");
    filteredProd ? setProduct(filteredProd) : getProd();
  }, [products]);
  
  
  const goBack = () => navigate(-1);

  return (
    <motion.div 
    className="p-container"
    initial={{ width: 0, opacity: 0}}
    animate={{ width: "100%", opacity: 1 }}
    exit={{ x: window.innerWidth}}
    transition={{duration: 0.5, delay: 0.5}}
    >
      <div key={product._id} className="p-details-item">
        <div className="p-details-img-container">
          <img src={product.image} className='p-details-img' />
        </div>
        <div className="p-details-details">
          <div className='p-details-card-header'>
            <h3>{product.title}</h3>
          </div>
          <p className='p-details-price'>Pris: {product.price} kr</p>
          <p>{getInstockText(product.inStock)}</p>
          <p>Produkt info: {product.description}</p>
          {product.inStock > 0 ? <BuyProductBtn _id={product._id} cssClass="p-details-buy" /> : <DisabledBuyProductBtn />}
          <div className="go-back" onClick={goBack}>
            ↼ Tillbaks
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
