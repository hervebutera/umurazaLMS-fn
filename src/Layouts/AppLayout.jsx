import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";


const AppLayout = () => { 

    const [displaySidebar, setDisplaySidebar] = useState(true)

    return (
        <>
            <Navbar
                displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}
            />
            <Sidebar
                displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}
            />
            <div className="p-4 lg:ml-64 mt-14">
                <Outlet />
            </div>
        </>
    )
}

export default AppLayout;
