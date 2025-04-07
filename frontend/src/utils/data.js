import { LuHandCoins, LuLayoutDashboard, LuLogOut } from "react-icons/lu";


export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
  
    {
        id: "02",
        label: "Expense",
        icon: LuHandCoins,
        path: "/addexpense",
    },
    {
        id: "03",
        label: "Budget",
        icon: LuHandCoins,
        path: "/setupbudget",
    },
    {
        id: "04",
        label: "Reports",
        icon: LuHandCoins,
        path: "/categoryreport",
    },
    
    {
        id: "05",
        label: "Logout",
        icon: LuLogOut,
        path: "/logout",
    },
];
