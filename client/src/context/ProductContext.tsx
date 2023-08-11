/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";
import { Product, FilterCriteria, NewProduct } from "../types";

interface IProductContext {
    products: Product[],
    addProduct: (product: NewProduct) => void,
    getProduct: (id: string) => Product,
    filterProducts: (criteria: FilterCriteria) => void,
    filteredProducts: Product[],
    fetchProducts: () => void,
    fetchProduct: (id: string) => Promise<Product>,
    updateInStockStateOnly: (productId: string, newInStock: number) => void,
    changeInStockByAmount: (productId: string, amount: number) => void,
    removeProduct: (productId: string) => void,
    updateProduct: (productId: string, updatedValues: Partial<Product>) => void
    getInstockText: (inStock: number) => string;

}

const ProductContext = createContext<IProductContext>({
    products: [],
    addProduct: () => { },
    getProduct: () => { return {} as Product },
    filterProducts: () => { },
    filteredProducts: [],
    fetchProducts: () => { },
    fetchProduct: () => { return {} as Promise<Product> },
    updateInStockStateOnly: () => { },
    changeInStockByAmount: () => { },
    removeProduct: () => { },
    updateProduct: () => { },
    getInstockText: () => "" 
})

export const useProductContext = () => useContext(ProductContext)

const ProductProvider = ({ children }: PropsWithChildren) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const addProduct = async (product: NewProduct) => {
        try {
            const response = await fetch(`/api/products/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product),
                credentials: "include"
            });
            if (response.ok) {
                const newProduct = await response.json();
                const newProductsList = [...products, newProduct];
                setProducts(newProductsList);
                console.log("Could send new product:", newProduct);
            }
            else {
                console.log("could not send product:", product);
                console.log(`following response was received: ${response.statusText}`);
            }
        }
        catch (error) {
            console.log(`An error occured: ${error}`)
        }
    };

    const getProduct = (id: string) => {
        const product = products.filter((p: Product) => {
            const matchResult = p._id === id;
            return matchResult;
        })

        return product[0];
    }

    const getInstockText = (inStock: number) => {
        let inStockText: string;
        switch (true) {
            case inStock < 0:
                inStockText = "Fel i lagersaldo";
                break;
            case inStock === 0:
                inStockText = "Ej i lager";
                break;
            case inStock <= 10:
                inStockText = "Fåtal i lager";
                break;
            default:
                inStockText = "I lager";
        }
        return inStockText;
    }

    const filterProducts = (criteria: FilterCriteria) => {
        const filtered = products.filter((product) =>
            product.price >= criteria.minPrice &&
            product.price <= criteria.maxPrice
        );
        setFilteredProducts(filtered);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data: Product[] = await response.json();
            const fakeProd: Product[] = [{
                "_id": "1",
                "title": "The Phone",
                "price": 1000,
                "description": "The Best!",
                "image": "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "inStock": 10
            }]
            const prodData: Product[] = (typeof data !== typeof products) ? fakeProd : data;
            setProducts(prodData);
        } catch (error) {
            console.error('Error fetching products:', error);
            throw new Error
        }
    };

    async function fetchProduct(id: string) {
        try {
          const response = await fetch(`api/products/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: "include"
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
      
          const data: Product = await response.json();
          return data;
        } catch (error) {
          throw new Error("Product not found... yet? Error: " + error);
        }
      }


    const updateInStockStateOnly = (productId: string, newInStock: number) => {
        setProducts((prevProducts: Product[]) =>
            prevProducts.map((product: Product) =>
                product._id === productId ? { ...product, inStock: product.inStock + newInStock } : product
            )
        );
    };

    const changeInStockByAmount = async (productId: string, amount: number) => {
        const prevProducts = products;

        const newProductsPromises = prevProducts.map(async (p: Product) => {
            if (p._id === productId) {
                const newP: Product = { ...p, inStock: p.inStock + amount };
                try {
                    const response = await fetch(`/api/products/${productId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newP),
                        credentials: "include"
                    });

                    if (response.ok) {
                        console.log(`Product updated: ${JSON.stringify(newP)}`);
                        return newP;
                    } else {
                        console.log(`Could not update product: ${JSON.stringify(newP)}`);
                        console.log(`Following response was received: ${response.statusText}`);
                        return p;
                    }
                } catch (error) {
                    console.log(`An error occurred: ${error}`);
                    return p;
                }
            } else {
                return p;
            }
        });

        const newProducts = await Promise.all(newProductsPromises);
        setProducts(newProducts);
    };

    const removeProduct = async (productId: string): Promise<void> => {
        const prevProducts = products;
        const filteredProducts = prevProducts.filter((p: Product) => p._id !== productId);
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });
            if (response.ok) {
                console.log(`deleted product with id: ${productId}`);
                return setProducts(filteredProducts);
            }
            else {
                console.log(`could not delete product with id: ${productId}`);
                console.log(`following response was received: ${response.statusText}`);
            }
        }
        catch (error) {
            console.log(`An error occured: ${error}`)
        }
    }

    const updateProduct = async (productId: string, updatedValues: Partial<Product>) => {
        const newProductsPromises = products.map(async (product) => {
            if (product._id === productId) {
                const updatedProduct = { ...product, ...updatedValues };
                try {
                    const response = await fetch(`/api/products/${productId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedProduct),
                        credentials: 'include',
                    });
                    if (response.ok) {
                        console.log("product updated:", updatedProduct);
                        return updatedProduct;
                    } else {
                        console.log('could not update product:', updatedProduct);
                        console.log(`following response was received: ${response.statusText}`);
                        return product;
                    }
                } catch (error) {
                    console.log(`An error occurred: ${error}`);
                    return product;
                }
            } else {
                return product;
            }
        });
    
        const newProducts = await Promise.all(newProductsPromises);
        setProducts(newProducts);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{
            products, addProduct, getProduct, filterProducts, filteredProducts, fetchProducts, fetchProduct, 
            updateInStockStateOnly, changeInStockByAmount, removeProduct, updateProduct, getInstockText
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider