import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    // ===========================
    // State
    // ===========================
    const [user, setUser] = useState(null);
    const [showUserLogin, setshowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    // ===========================
    // Fetch Logged-in User
    // ===========================
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");

            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems || {});
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }
    };



    // ===========================
    // Fetch Products
    // ===========================
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");

            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    //fetch farmer wise product
    const fetchMyProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/my-products");
    
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // ===========================
    // Cart Functions
    // ===========================
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);
        toast.success("Added to Cart");
    };

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);

        if (quantity <= 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }

        setCartItems(cartData);
        toast.success("Cart Updated");
    };

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId]--;

            if (cartData[itemId] <= 0) {
                delete cartData[itemId];
            }
        }

        setCartItems(cartData);
        toast.success("Removed from Cart");
    };

    // ===========================
    // Cart Count
    // ===========================
    const getCartCount = () => {
        let total = 0;

        for (const item in cartItems) {
            total += cartItems[item];
        }

        return total;
    };

    // ===========================
    // Cart Amount
    // ===========================
    const getCartAmount = () => {
        let total = 0;

        for (const item in cartItems) {
            const product = products.find((p) => p._id === item);

            if (product) {
                total += product.offerPrice * cartItems[item];
            }
        }

        return Math.floor(total * 100) / 100;
    };

    // ===========================
    // Sync Cart
    // ===========================
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post("/api/cart/update", {
                    cartItems,
                });

                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (user?.role === "consumer") {
            updateCart();
        }
    }, [cartItems]);

    // ===========================
    // Initial Load
    // ===========================
    useEffect(() => {
        fetchUser();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (user?.role === "farmer") {
            fetchMyProducts();
        } else if (user?.role === "consumer") {
            fetchProducts();
        }
    }, [user]);

    // ===========================
    // Logout
    // ===========================
    const logout = async () => {
        try {
            const { data } = await axios.get("/api/user/logout");

            if (data.success) {
                setUser(null);
                setCartItems({});
                navigate("/");
                toast.success("Logged Out");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ===========================
    // Role Helpers
    // ===========================
    const isConsumer = user?.role === "consumer";
    const isFarmer = user?.role === "farmer";
    const isAdmin = user?.role === "admin";

    // ===========================
    // Context Value
    // ===========================
    const value = {
        axios,
        navigate,
        currency,

        user,
        setUser,

        isConsumer,
        isFarmer,
        isAdmin,

        logout,

        showUserLogin,
        setshowUserLogin,

        products,
        fetchUser,
        fetchProducts,
        fetchMyProducts,

        cartItems,
        setCartItems,

        addToCart,
        updateCartItem,
        removeFromCart,

        getCartCount,
        getCartAmount,

        searchQuery,
        setSearchQuery,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};

