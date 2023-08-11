import { Link } from 'react-router-dom';
import { Product } from '../../types';
import BuyProductBtn from '../BuyProductBtn/BuyProductBtn';
import "./ProductCard.css";
import { useEffect, useState } from 'react';
import { useProductContext } from '../../context/ProductContext';
import DisabledBuyProductBtn from '../DisabledBuyProductBtn/DisabledBuyProductBtn';
import { motion } from "framer-motion";


function ProductCard({ _id, title, image, price, inStock, description, i }: Product) {

    const [product, setProduct] = useState({
        "_id": "1",
        "title": "...",
        "price": 0,
        "description": "...",
        "image": "../img/iphone.png",
        "inStock": 0
      });
    
      const { fetchProduct, getProduct, products, getInstockText } = useProductContext();

      useEffect(() => {
        async function getProd() {
          if (_id === undefined) throw "No valid id"
          const product = await fetchProduct(_id);
          setProduct(product)
        }
        const filteredProd = getProduct(_id ?? "");
        filteredProd ? setProduct(filteredProd) : getProd();
      }, [products]);

      function shortenDescription(d: string) {
        if (d.length <= 15) {
          return d;
        } else {
          return d.slice(0, 15) + '...';
        }
      }

    return (
        <motion.div 
          key={_id} 
          className="item"
          initial={{opacity: 0, translateX: -90, translateY: -50}}
          animate={{opacity: 1, translateX: 0, translateY: 0}}
          transition={{duration: 0.9, delay:( i || 0.1) * 0.2}}
        >
            <div className="product-img-container">
                <img src={image} className='product-img' />
            </div>
            <div className="product-details">
                <div className='card-header'>
                    <h3>{title}</h3>
                </div>
                <p className='price'>{price} kr</p>
                <p>{getInstockText(inStock)}</p>
                <p>Produkt info: {shortenDescription(description)}</p>
                <div className='button-container'>
                    
                    {product.inStock > 0 ? <BuyProductBtn _id={product._id} cssClass="buy" /> : <DisabledBuyProductBtn />}
                    <Link to={`/product/${_id}`} key={_id}>
                        <div className="buy">Mer info</div>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard