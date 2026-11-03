import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = ({ role = "consumer" }) => {
    const {
        setshowUserLogin,
        setUser,
        axios,
        navigate,
        fetchUser,
    } = useAppContext();

    const [state, setState] = useState("login");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            let body = {};

            // Register
            if (state === "register") {
                body = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role,
                };
            }

            // Login
            else {
                body = {
                    email: formData.email,
                    password: formData.password,
                };
            }

            const { data } = await axios.post(
                `/api/user/${state}`,
                body
            );

            if (!data.success) {
                return toast.error(data.message);
            }

            setUser(data.user);

            // Refresh latest user data
            if (fetchUser) {
                await fetchUser();
            }

            toast.success(
                state === "login"
                    ? "Login Successful"
                    : "Account Created Successfully"
            );

            setshowUserLogin(false);

            // ======================
            // Redirect according to role
            // ======================
            switch (data.user.role) {
                case "admin":
                    navigate("/admin");
                    break;

                case "farmer":
                    navigate("/farmer/dashboard");
                    break;

                default:
                    navigate("/");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    error.message
            );
        }
    };

    return (
        <div
            onClick={() => setshowUserLogin(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl w-80 sm:w-[360px] p-8 flex flex-col gap-4"
            >
                <h2 className="text-2xl font-semibold text-center">
                    <span className="text-primary">
                        {role === "farmer"
                            ? "Seller"
                            : "User"}
                    </span>{" "}
                    {state === "login"
                        ? "Login"
                        : "Register"}
                </h2>

                {state === "register" && (
                    <div>
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 border rounded p-2 outline-primary"
                            placeholder="Enter your name"
                        />
                    </div>
                )}

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 border rounded p-2 outline-primary"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 border rounded p-2 outline-primary"
                        placeholder="Enter your password"
                    />
                </div>

                {state === "login" ? (
                    <p className="text-sm">
                        Don't have an account?{" "}
                        <span
                            onClick={() =>
                                setState("register")
                            }
                            className="text-primary cursor-pointer"
                        >
                            Register
                        </span>
                    </p>
                ) : (
                    <p className="text-sm">
                        Already have an account?{" "}
                        <span
                            onClick={() =>
                                setState("login")
                            }
                            className="text-primary cursor-pointer"
                        >
                            Login
                        </span>
                    </p>
                )}

                {role === "consumer" && (
                    <p className="text-sm">
                        Are you a Seller?{" "}
                        <span
                            onClick={() => {
                                setshowUserLogin(false);
                                navigate("/farmer/login");
                            }}
                            className="text-primary cursor-pointer"
                        >
                            Seller Login
                        </span>
                    </p>
                )}

                {role === "farmer" && (
                    <p className="text-sm">
                        Continue as Consumer?{" "}
                        <span
                            onClick={() => {
                                setshowUserLogin(false);
                                navigate("/");
                            }}
                            className="text-primary cursor-pointer"
                        >
                            User Login
                        </span>
                    </p>
                )}

                <button
                    type="submit"
                    className="bg-primary text-white rounded py-2 hover:opacity-90 transition"
                >
                    {state === "login"
                        ? "Login"
                        : "Create Account"}
                </button>
            </form>
        </div>
    );
};

export default Login;




