import { useState } from "react";
import NavbarDB from "./NavbarDB";
import './Dashboard.css';

function Dashboard() {
    const [showSearchDrawer, setShowSearchDrawer] = useState(false);
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
        <NavbarDB />
            <div className="flex-1 p-15">
                <h1 className="text-4xl font-semibold">Your Goals</h1>
                <div className="mt-10 flex flex-row gap-4">
                    <button className="px-6 sm:px-10 lg:px-16 py-2 bg-[#7F7F7F] text-base sm:text-lg lg:text-xl text-white font-semibold rounded-lg">Add Todo</button>
                    <div className="relative flex-1 hidden md:block">
                        <input type="text" placeholder="Cari todo..." className="w-full px-4 py-2 border rounded-md text-base"/>
                        <img src="search.png" alt="search" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5"/>
                    </div>

                    {/* Mobile */}
                    <div className="block md:hidden ml-auto my-auto">
                        <button onClick={() => setShowSearchDrawer(true)} className="rounded-md">
                            <img src="search.png" alt="Search" className="rounded-md h-9 w-10 object-cover select-none" draggable="false"/>
                        </button>
                    </div>
                </div>
                <div className="w-[30%] h-[35vh] mt-8 flex flex-col">
                  <div className="bg-[#313131] py-2 px-3 flex-none">
                    <p className="text-white">Todo List</p>
                  </div>
                  <div className="bg-[#F1F1F1] p-3 flex-1 overflow-auto hide-scrollbar">
                    <p>lkasdlaksdn</p>
                    <p>lajsdhasdlokn</p>
                    <p>item tambahan 1</p>
                    <p>item tambahan 2</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                    <p>item tambahan 3</p>
                  </div>
                </div>
            </div>

            {/* Memunculkan Overlay Search Mobile */}
            <input type="text" className={`fixed top-[80px] left-1/2 -translate-x-1/2 w-[80%] h-0 sm:w-[80%] bg-white shadow-lg z-50 p-6 rounded-lg transition-opacity duration-300 ease-in-out outline-1 outline-[#242424] ${showSearchDrawer ? "opacity-100 visible" : "opacity-0 invisible"}`}/>

            {/* BACKGROUND OPACITY HITAM */}
            {showSearchDrawer && (
            <div className="fixed inset-0 bg-black/75 z-40 transition-opacity duration-300" onClick={() => setShowSearchDrawer(false)}>
                
            </div>)}




        </div>
    )
}

export default Dashboard;