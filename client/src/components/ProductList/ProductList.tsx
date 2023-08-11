import { useProductContext } from '../../context/ProductContext';
import ProductCard from '../ProductCard/ProductCard';
import "./ProductList.css";
import { motion } from "framer-motion";

const ProductList = () => {

  const { products } = useProductContext();

  return (
    <div className="products-container">
      {products.map((product, i) => (
          <ProductCard
            key={product._id}
            _id={product._id}
            title={product.title}
            price={product.price}
            description={product.description}
            image={product.image}
            inStock={product.inStock}
            i={i}
          />
      ))}
    </div>
  );
};

export default ProductList;

