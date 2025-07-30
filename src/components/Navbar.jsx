import { useState } from "react";

function Navbar({ onOpenRegister, onOpenLogin }) {
    const [isOpen, setIsOpen] = useState(false);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-gray-50 shadow-lg max-w-[1563px] mx-auto">
            <div className="flex justify-between items-center py-4 px-4 md:px-10 lg:px-20 xl:px-40">
                <div className="flex items-center space-x-6">
                    <img
                        className="h-auto w-[50px]"
                        src="public/Untitled11_20250718132147.png"
                        alt="Logo"
                    />

                    <div className="hidden md:flex space-x-6">
                        <a onClick={() => scrollTo("home")} className="font-normal text-[22px] text-gray-800 cursor-pointer">Home</a>
                        <a onClick={() => scrollTo("service")} className="font-normal text-[22px] text-gray-800 cursor-pointer">Service</a>
                        <a onClick={() => scrollTo("about")} className="font-normal text-[22px] text-gray-800 cursor-pointer">About</a>
                    </div>
                </div>

                <div className="hidden md:flex space-x-6">
                    <button onClick={onOpenLogin} className="font-normal text-[22px] text-gray-800">Login</button>
                    <button onClick={onOpenRegister} className="font-normal text-[22px] text-gray-800">Register</button>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="focus:outline-none"
                    >
                        <svg
                            className="w-8 h-8 text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu dengan Scroll */}
            {isOpen && (
                <div className="md:hidden bg-gray-50 shadow-lg px-4 py-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                    <a onClick={() => scrollTo("home")} className="block font-normal text-[20px] text-gray-800">Home</a>
                    <a onClick={() => scrollTo("service")} className="block font-normal text-[20px] text-gray-800">Service</a>
                    <a onClick={() => scrollTo("about")} className="block font-normal text-[20px] text-gray-800">About</a>

                    <button onClick={onOpenLogin} className="block w-full text-left font-normal text-[20px] text-gray-800">Login</button>
                    <button onClick={onOpenRegister} className="block w-full text-left font-normal text-[20px] text-gray-800">Register</button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;