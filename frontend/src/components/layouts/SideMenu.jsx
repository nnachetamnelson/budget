import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation(); // Get current route

    const handleClick = (route) => { 
        if (route === "logout") {  
            handleLogout();
            return; 
        }
        navigate(route); 
    };

    const handleLogout = () => { 
        localStorage.clear();
        clearUser();
        navigate("/login"); 
    };

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
               
                {!user?.profileImageUrl ? (
                    <CharAvatar
                        fullName={user?.fullName || "User"}
                        width="w-20"
                        height="h-20"
                        style="text-xl"
                    />
                ) : (
                    <img 
                        src={user?.profileImageUrl}
                        alt="Profile Image"
                        className="w-20 h-20 bg-slate-400 rounded-full"
                    />
                )}

             
                <h5 className="text-gray-950 font-medium leading-6">
                    {user?.fullName || "User"}
                </h5>

                {/* Menu Items */}
                <div className="w-full mt-5">
                    {SIDE_MENU_DATA.map((item, index) => (
                        <button
                            key={`menu_${index}`}
                            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all duration-300 
                                ${
                                    location.pathname === item.path
                                        ? "bg-blue-300 text-white font-semibold"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            onClick={() => handleClick(item.path)}
                        >
                            <item.icon className="text-xl" />
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
