import "./AdminProductDetails.css"
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import { Product } from "../../types";
import Loader from "../Loader/Loader";

const AdminProductDetails = () => {
  const { fetchProduct, updateProduct, removeProduct, products, getProduct } = useProductContext();

  const [product, setProduct] = useState<Product | null>(null)
  const [updatedProduct, setUpdatedProduct] = useState<Partial<Product>>({})

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) { 
      const fetchProductData = async () => {
        try {
          const productData = await fetchProduct(id);
          setProduct(productData);
          
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      const filteredProd = getProduct(id ?? "");
      filteredProd ? setProduct(filteredProd) : fetchProductData();
    }
  }, [products]);

  const handleDeleteProduct = async () => {
    if (product) {
      try {
        await removeProduct(product._id);
        navigate("/admin");
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const updatedValue = type === "checkbox" ? checked : value;

    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        updatedValue === ""
          ? ""
          : name === "price" || name === "inStock"
          ? Number(updatedValue)
          : updatedValue,
    }));
  };

  const handleUpdateProduct = async () => {
    if (product && Object.keys(updatedProduct).length > 0) {
      try {
        const updatedValues = { ...product, ...updatedProduct };
        await updateProduct(product._id, updatedValues);
        setUpdatedProduct({});
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };
  

    return product ? (
      <div className="adminProductDetails__container">
        <div className="admin-product-details-image">
        <img src={product.image} alt={product.title} />
        </div>
        <div className="admin-product-details-wrapper">
        <div className="admin-product-details-info">
          <p>Titel: {product.title}</p>
          <input type="text" name="title" value={updatedProduct.title || product.title} onChange={handleChange} />
          <p>Image: {product.image}</p>
          <input type="url" name="image" value={updatedProduct.image || product.image} onChange={handleChange} />
          <p>Beskrivning: {product.description}</p>
          <input type="text" name="description" value={updatedProduct.description || product.description} onChange={handleChange} />
          <p>Pris: {product.price} kr</p>
          <input type="number" name="price" value={updatedProduct.price || product.price} onChange={handleChange} />
          <p>I lager: {product.inStock}</p>
          <input type="number" name="inStock" value={updatedProduct.inStock || product.inStock} onChange={handleChange} />
        </div>
        <div className="admin-product-details-btn">
          <button onClick={handleUpdateProduct}>Spara ändringar</button>
          <button onClick={handleDeleteProduct}>Ta bort produkt</button>
        </div>
        </div>
      </div>
    ) : <Loader />
  };
  
  export default AdminProductDetails;