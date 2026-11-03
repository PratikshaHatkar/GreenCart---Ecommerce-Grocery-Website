import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const FarmerLayout = () => {
    const { axios ,navigate  ,user , logout} = useAppContext();


    const sidebarLinks = [
        { name: "Dashboard", path: "/farmer/dashboard", icon: assets.dashboard_icon },
        { name: "Add Product", path: "/farmer", icon: assets.add_icon },
        { name: "Product List", path: "/farmer/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/farmer/orders", icon: assets.order_icon },
    ];

    // const logout = async ()=>{
    //     try{
    //         const {data} = await axios.get('/api/logout')
    //         if(data.success){
    //             toast.success(data.message);
    //             navigate('/')
    //         }
    //         else{
    //             toast.error(data.message)
    //         }
    //     }
    //     catch(error){
    //        toast.error(data.message)
    //     }
        
    // }
    return (
        <>
            <div className="fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to='/'>
                    <img className="cursor-pointer w-34 md:w-38" src={assets.logo} alt="Logo" />
                </Link>
                {user && <div className="flex items-center gap-5 text-gray-500">
                    <p className="text-black text-xl">{user.name}</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
                 }
            </div>

            <div className="flex mt-[40px]"> 
            <div className="fixed left-0  md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
                    {sidebarLinks.map((item) => (
                        <NavLink to={item.path} key={item.name} end={item.path === "/farmer"}
                            className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                                ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-100/90 border-white"
                                }`
                            }
                        >
                            <img src={item.icon} alt="" className="w-7 h-7" />
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>

                <main className="ml-10 md:ml-64 w-full p-2">
                   <Outlet />
               </main>

            </div>
               
        </>
    );
};

export default FarmerLayout;