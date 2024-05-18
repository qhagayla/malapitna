import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { logo } from "../../assets/assets";
import {
    NAVIGATION_MENU,
    /*NAVIGATION_CONFIG,*/
} from "../lib/constants/navigation";
import { Link } from "react-router-dom";
import { getProfile } from "@/services/api/getProfile";

const SidebarContext = createContext();

export default function Sidebar() {
    const [expanded, setExpanded] = useState(true);
    const [response, setResponse] = useState(null);

    const payload = {
        access: localStorage.getItem("accessToken"),
        refresh: localStorage.getItem("refreshToken"),
    };

    // TODO: Fix bug for accessing resources
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const _response = await getProfile(payload);
    //         setResponse(_response);
    //     };

    //     fetchData();
    // });

    return (
        <aside className="sticky h-screen">
            <nav className="h-full flex flex-col bg-secondary border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src={logo}
                        className={`overflow-hidden transition-all duration-500  ${
                            expanded ? "w-48" : "w-0"
                        }`}
                        alt=""
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-white hover:bg-primary"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                <SidebarContext.Provider value={{ expanded }}>
                    <div className="flex-1 px-3 mt-6">
                        {NAVIGATION_MENU.map((item) => (
                            <SidebarItem key={item.key} item={item} />
                        ))}
                    </div>
                </SidebarContext.Provider>
                {/*<SidebarContext.Provider value={{ expanded }}>
                    <div className="flex-2 px-3 mb-6">
                        {NAVIGATION_CONFIG.map((item) => (
                            <SidebarItem key={item.key} item={item} />
                        ))}
                    </div>
                </SidebarContext.Provider>*/}

                {/**
                 * TODO: Apply custom user for this.
                 * MUST MATCH WHICH USER IS LOGGED IN
                 */}

                <div className="flex p-4 bg-primary">
                    {/*<img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-full"
                />*/}
                    <div
                        className={`
              flex justify-between items-center
              overflow-hidden transition-all duration-500 ease-out ${
                  expanded ? "w-52 ml-3" : "w-0"
              }
          `}
                    >
                    
                        <div className="leading-4">
                            <h4 className="font-bold">
                                {/* {`${response.first_name} ${response.last_name}`} */}
                            </h4>
                            <span className="text-xs text-black">
                                {/* {`${response.email}`} */}
                            </span>
                        </div> 
                        {/*<MoreVertical size={20} />*/}
                    </div> 
                </div> 
            </nav>
        </aside>
    );
}

export function SidebarItem({ item }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <Link
            to={item.path}
            className="relative flex items-center py-2 px-3 my-1 rounded-md cursor-pointer transition-colors group hover:bg-primary"
        >
            {item.icon}
            <span
                className={`overflow-hidden truncate transition-all duration-500  ${
                    expanded ? "w-52 ml-3 " : "w-0"
                } `}
            >
                {item.label}
            </span>

            {!expanded && (
                <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6
          bg-primary text-black-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all duration-500
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          overflow-hidden truncate`}
                >
                    {item.label}
                </div>
            )}
        </Link>
    );
}
