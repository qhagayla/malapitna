import React from "react";
import getTime from "@/hooks/getTime.js";

export default function Header() {
    return (
        <>
            {/*header*/}
            <div className="p-8 flex justify-between items-center shadow sm-5">
                <h1 className="text-3xl font-bold">Greetings!</h1>
                <p className="text-xl font-semibold">
                    {getTime().toLocaleTimeString()}
                </p>
            </div>
        </>
    );
}
