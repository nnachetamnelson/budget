import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  console.log(`DashboardLayout rendering with activeMenu: ${activeMenu}`);

 
  const getChildComponentName = (child) => {
    if (!child || !child.type) return "Unknown";
    return typeof child.type === "string" ? child.type : child.type.name || "Unnamed";
  };

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5" key={activeMenu}>
            {console.log(`Rendering children in DashboardLayout: ${getChildComponentName(children)}`)}
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
