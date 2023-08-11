import "./AdminNewProduct.css"
import { useState } from "react"
import { useProductContext } from "../../context/ProductContext"
import { NewProduct } from "../../types"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const AdminNewProduct = () => {
  const { addProduct } = useProductContext()
  const [newProduct, setNewProduct] = useState<NewProduct>({
    title: "",
    price: 0,
    description: "",
    image: "",
    inStock: 0
  })

  const navigate = useNavigate()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProduct((prevNewProduct)  => ({
      ...prevNewProduct,
      [name]: value === "" ? "" : (name === "price" || name === "inStock") ? Number(value) : value
    }))
  }

  const handleCreateProduct: SubmitHandler<NewProduct> = async () => {
    const productCopy = { ...newProduct };
    await addProduct(productCopy);
    navigate("/admin")
  };

  const { register, handleSubmit, formState: { errors }} = useForm<NewProduct>()
  const getErrorMessage = (fieldName: keyof NewProduct) => errors?.[fieldName]?.type === "required" && <p>*</p>;

    return(
        <div className="adminNewProduct__container">
            <h1>Create product</h1>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <label>Title: 
            <input type="text" value={newProduct.title} {...register("title", {
              required: true
            })} onChange={handleChange}/> {getErrorMessage("title")}
          </label>
          <label>Price: 
            <input type="number" value={newProduct.price} {...register("price", {
              required: true
            })} onChange={handleChange}/> {getErrorMessage("price")}
          </label>
          <label>Description:
            <input type="text" value={newProduct.description} {...register("description", {
              required: true
            })} onChange={handleChange}/> {getErrorMessage("description")}
          </label>
          <label>Image: 
            <input type="url" value={newProduct.image} {...register("image", {
              required: true
            })} onChange={handleChange}/> {getErrorMessage("image")}
          </label>
          <label>In Stock: 
            <input type="number" value={newProduct.inStock} {...register("inStock", {
              required: true
            })} onChange={handleChange}/> {getErrorMessage("inStock")}
          </label>
          <input type="submit" value="Skapa produkt"/>
        </form>
        </div>
    )
}

export default AdminNewProduct