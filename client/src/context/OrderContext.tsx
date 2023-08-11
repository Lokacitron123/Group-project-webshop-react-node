import { createContext, useState, useEffect } from "react"
import { CartItem } from "./CartContext"

export interface Order {
    _id: string,
    orderNumber: number, 
    customer: User,
    orderItems: CartItem[],
    deliveryAddress: Address,
    shipped: boolean,
    shippingMethod: Shipping
}

interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin?: boolean,
}

export interface Product {
    _id: string,
    title: string,
    description: string,
    price: number,
    inStock: number,
    image: string
}

export interface Address {
    street: string,
    zipcode: string,
    city: string,
    country: string
}

export interface Shipping {
    _id: string,
    company: string,
    price: number,
    deliveryTimeInHours: number
}

export interface NewOrder {
    orderItems: { product: string; quantity: number; }[],
    deliveryAddress: Address,
    shippingMethod: string
}

interface ConfirmationOrder {
    createdAt: string,
    orderNumber: number,
    deliveryAddress: Address,
    orderItems: { product: string; quantity: number; }[],
    shippingMethod: string
}

interface OrderContextProps {
    createOrder: (newOrder: NewOrder) => Promise<any>,
    getOrder: (id: string) => Promise<any>,
    getAllOrders: () => Promise<any>,
    markAsShipped: (id: string) => Promise<any>,
    lastOrder: ConfirmationOrder | null,
    orders: Order[],
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>,
    shipping: Shipping[]
}

export const OrderContext = createContext<OrderContextProps>({} as OrderContextProps)

export const OrderProvider = ({ children }: { children: React.ReactNode}) => {
    const [orders, setOrders] = useState<Order[]>([])
    const [lastOrder, setLastOrder] = useState<ConfirmationOrder | null>(null)

    const [shipping, setShipping] = useState<Shipping[]>([]);
    
    const getAllShippingMethods = async () => {
        try {
            const res = await fetch("/api/shippingMethod")
            const data = await res.json()

            setShipping(data)
        } catch (error: any) {
            console.log(error.message);
        }
    }
    
    const createOrder = async (newOrder: NewOrder) => {
            try {
                const res = await fetch("/api/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newOrder), 
                    credentials: "include"
                })
    
                const data = await res.json()
                setLastOrder(data)
                
                return data
            } catch (error: any) {
                console.log(error.message);
            } 
    }

    const getOrder = async (id: string) => {
        try {
            const res = await fetch(`/api/orders/${id}`, {
                credentials: "include"
            })
            const data: Order = await res.json()

            return data
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const getAllOrders = async () => {
        try {
            const res = await fetch("/api/orders", {
                credentials: "include"
            })
            const data: Order[] = await res.json()

            setOrders(data)
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllOrders();
        getAllShippingMethods();
    }, [lastOrder]);

    const markAsShipped = async (id: string) => {
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "shipped": true }),
                credentials: "include"
            })
            const data: Order = await res.json()

            return data
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return(
        <OrderContext.Provider value={{ createOrder, getOrder, getAllOrders, markAsShipped, lastOrder, orders, setOrders, shipping }}>
            {children}
        </OrderContext.Provider>
    )
}

