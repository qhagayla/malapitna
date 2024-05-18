import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
    return (
        <>
            {/* <div className="flex flex-row h-screen w-screen overflow-hidden">
                <aside>
                    <Sidebar />
            
                </aside>
               
                <div className="p-8 w-full">{<Outlet />}</div>
            </div> */}

            <div className="flex flex-row h-screen w-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />
                    <div className="p-8 flex-1 min-h-0 overflow-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
