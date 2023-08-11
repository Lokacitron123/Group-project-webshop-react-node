import { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types";
import { useProductContext } from "../context/ProductContext";


export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (productId: string, quantity: number) => void;
    removeFromCart: (product: Product) => void;
    productDecrement: (productId: string, quantity: number) => void;
    clearCart: () => void;
}
// Utility functions for local storage
function getCartFromLocalStorage() {
    let cart;
    if (typeof window !== "undefined") {
        cart = localStorage.getItem("cart");
    }
    return cart ? JSON.parse(cart) : [];
}

function setCartInLocalStorage(cart: CartItem[]) {
    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

const initialCartContext: CartContextProps = {
    cartItems: [],
    addToCart: () => { },
    productDecrement: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
};

export const CartContext = createContext<CartContextProps>(initialCartContext);

export const useCartContext = () => useContext(CartContext);


export const CartProvider = ({ children }: { children: React.ReactNode }) => {


    const { getProduct } = useProductContext();

    // Initialize state from local storage
    const [cartItems, setCartItems] = useState<CartItem[]>(getCartFromLocalStorage());

    useEffect(() => {
        setCartInLocalStorage(cartItems);
    }, [cartItems]);

    const addToCart = (productId: string, quantity: number) => {
        const product = getProduct(productId);
        const existingCartItem = cartItems.find((item) => item.product._id === product._id);

        if (existingCartItem) {
            const updatedCartItems = cartItems.map((item) => {
                if (item.product._id === product._id) {
                    return { product, quantity: item.quantity + quantity };
                } else {
                    return item;
                }
            });
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { product, quantity }]);
        }
    };
    const productDecrement = (productId: string, quantity: number) => {
        const product = getProduct(productId);
        const existingCartItem = cartItems.find((item) => item.product._id === product._id);

        if (existingCartItem) {
            let updatedCartItems = cartItems.map((item) => {
                if (item.product._id === product._id) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - quantity };
                    }
                }
                return item;
            });

            updatedCartItems = updatedCartItems.filter(item => !(item.quantity === 1 && item.product._id === productId));
            // This removes the item with quantity 1 and that matches the productId

            setCartItems(updatedCartItems);
        }
    };
    const removeFromCart = (product: Product) => {
        const updatedCartItems = cartItems.filter((item) => item.product._id !== product._id);
        setCartItems(updatedCartItems);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, productDecrement }}>
            {children}
        </CartContext.Provider>
    );
};
