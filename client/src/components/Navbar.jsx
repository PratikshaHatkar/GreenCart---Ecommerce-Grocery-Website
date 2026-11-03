import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
    const {
        user,
        logout,
        setshowUserLogin,
        navigate,
        searchQuery,
        setSearchQuery,
        getCartCount,
    } = useAppContext();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products");
        }
    }, [searchQuery]);

    return (
        <nav className="fixed top-0 left-0 w-full right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white">
        {/* <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all"> */}

            {/* Logo */}
            <NavLink to="/" onClick={() => setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* ================= Desktop ================= */}
            <div className="hidden sm:flex items-center gap-8">

                {/* Consumer Links */}
                {user?.role !== "farmer" && user?.role !== "admin" && (
                    <>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/products">All Products</NavLink>
                        <NavLink to="/">Contact</NavLink>
                    </>
                )}

                {/* Farmer Links */}
                {user?.role === "farmer" && (
                    <>
                        <NavLink to="/farmer">Dashboard</NavLink>
                        <NavLink to="/farmer/product-list">
                            My Products
                        </NavLink>
                        <NavLink to="/farmer/orders">
                            Orders
                        </NavLink>
                    </>
                )}

                {/* Admin Links */}
                {user?.role === "admin" && (
                    <>
                        <NavLink to="/admin">
                            Dashboard
                        </NavLink>

                        <NavLink to="/admin/orders">
                            Orders
                        </NavLink>

                        <NavLink to="/admin/users">
                            Users
                        </NavLink>
                    </>
                )}

                {/* Search only for consumers */}
                {user?.role !== "farmer" &&
                    user?.role !== "admin" && (
                        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">

                            <input
                                value={searchQuery}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
                                className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                                placeholder="Search Products"
                            />

                            <img
                                src={assets.search_icon}
                                className="h-4 w-4"
                                alt=""
                            />

                        </div>
                    )}

                {/* Cart */}
                {user?.role !== "farmer" &&
                    user?.role !== "admin" && (
                        <div
                            onClick={() => navigate("/cart")}
                            className="relative cursor-pointer"
                        >
                            <img
                                src={assets.nav_cart_icon}
                                className="w-6"
                                alt=""
                            />

                            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                                {getCartCount()}
                            </button>
                        </div>
                    )}

                {/* Login */}
                {!user && (
                    <button
                        onClick={() => setshowUserLogin(true)}
                        className="px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
                    >
                        Login
                    </button>
                )}

                {/* Profile */}
                {user && (
                    <div className="relative group">

                        <img
                            src={assets.profile_icon}
                            className="w-10 cursor-pointer"
                            alt=""
                        />

                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white border shadow rounded w-44 z-50">

                            <li className="px-4 py-2 font-semibold border-b">
                                {user.name}
                            </li>

                            {user.role === "consumer" && (
                                <li
                                    onClick={() =>
                                        navigate("/my-orders")
                                    }
                                    className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                                >
                                    My Orders
                                </li>
                            )}

                            {user.role === "farmer" && (
                                <li
                                    onClick={() =>
                                        navigate("/farmer")
                                    }
                                    className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                                >
                                    Farmer Dashboard
                                </li>
                            )}

                            {user.role === "admin" && (
                                <li
                                    onClick={() =>
                                        navigate("/admin")
                                    }
                                    className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                                >
                                    Admin Dashboard
                                </li>
                            )}

                            <li
                                onClick={logout}
                                className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-red-500"
                            >
                                Logout
                            </li>

                        </ul>
                    </div>
                )}
            </div>

            {/* ================= Mobile ================= */}

            <div className="flex sm:hidden items-center gap-5">

                {user?.role !== "farmer" &&
                    user?.role !== "admin" && (
                        <div
                            onClick={() => navigate("/cart")}
                            className="relative cursor-pointer"
                        >
                            <img
                                src={assets.nav_cart_icon}
                                className="w-6"
                                alt=""
                            />

                            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                                {getCartCount()}
                            </button>
                        </div>
                    )}

                <button
                    onClick={() => setOpen(!open)}
                >
                    <img
                        src={assets.menu_icon}
                        alt=""
                    />
                </button>
            </div>

            {open && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-3 px-5 py-4 sm:hidden">

                    {user?.role !== "farmer" &&
                        user?.role !== "admin" && (
                            <>
                                <NavLink
                                    to="/"
                                    onClick={() => setOpen(false)}
                                >
                                    Home
                                </NavLink>

                                <NavLink
                                    to="/products"
                                    onClick={() => setOpen(false)}
                                >
                                    Products
                                </NavLink>

                                {user && (
                                    <NavLink
                                        to="/my-orders"
                                        onClick={() =>
                                            setOpen(false)
                                        }
                                    >
                                        My Orders
                                    </NavLink>
                                )}
                            </>
                        )}

                    {user?.role === "farmer" && (
                        <>
                            <NavLink to="/farmer">
                                Dashboard
                            </NavLink>

                            <NavLink to="/farmer/product-list">
                                My Products
                            </NavLink>

                            <NavLink to="/farmer/orders">
                                Orders
                            </NavLink>
                        </>
                    )}

                    {user?.role === "admin" && (
                        <>
                            <NavLink to="/admin">
                                Dashboard
                            </NavLink>

                            <NavLink to="/admin/orders">
                                Orders
                            </NavLink>
                        </>
                    )}

                    {!user ? (
                        <button
                            onClick={() => {
                                setshowUserLogin(true);
                                setOpen(false);
                            }}
                            className="bg-primary text-white rounded-full py-2"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={logout}
                            className="bg-primary text-white rounded-full py-2"
                        >
                            Logout
                        </button>
                    )}

                </div>
            )}

        </nav>
    );
};

export default Navbar;


