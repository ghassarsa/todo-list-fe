import './NavbarDB.css';
import AuthController from '../controllers/AuthController';
import { useState } from "react";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

export default function ResponsiveNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const logout = AuthController((state) => state.logout);
    const navigate = useNavigate();
    const user = AuthController((state) => state.user);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
          await logout();
          Swal.fire({
            icon: "success",
            title: "Berhasil Logout",
            text: "Anda berhasil logout",
          }).then(() => {
            navigate("/");
          });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Gagal Logout",
            text: "Silakan coba lagi",
          });
        }
    };

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden bg-[#242424] p-4 flex justify-between items-center">
                <h1 className="text-white text-xl font-semibold">Todo-List</h1>
                <button 
                    onClick={toggleMenu}
                    className="text-white p-2"
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-0.5 bg-white mb-1 transition-all duration-300"></div>
                    <div className="w-6 h-0.5 bg-white mb-1 transition-all duration-300"></div>
                    <div className="w-6 h-0.5 bg-white transition-all duration-300"></div>
                </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex bg-[#242424] max-w-[1563px] w-[20%] h-auto justify-center">

                <div className="my-15 text-white flex flex-col items-center fixed w-[15%]">
                    <h1 className="text-[30px] font-semibold">Todo-List</h1>
                    <div className="w-full mt-5 relative flex justify-center">
                        <img src={user?.avatar ? `${import.meta.env.VITE_API_URL_IMAGE}/storage/${user.avatar}` : "/src/assets/profile-default.png"} alt="" className="w-40 h-40 rounded-full outline-4 outline-white object-cover"/>
                    </div>
                    <p className="text-[21px] mt-3 font-medium text-center">Greetings, {user.name}!</p>
                    <div className="w-full min-h-[390px] mt-7 flex flex-col items-center text-center">
                        <div className="bg-[#626262] text-[20px] min-h-[5vh] w-full rounded-lg font-medium hover:bg-[#505050] flex items-center justify-center cursor-pointer">
                            <Link to="/dashboard">Dashboard</Link>
                        </div>
                        <div className="bg-[#626262] text-[20px] min-h-[5vh] w-full mt-3 rounded-lg font-medium hover:bg-[#505050] flex items-center justify-center cursor-pointer">
                            <Link to="/history">History Goals</Link>
                        </div>
                        <div className="bg-[#626262] text-[20px] min-h-[5vh] w-full mt-3 rounded-lg font-medium hover:bg-[#505050] flex items-center justify-center cursor-pointer">
                            <Link to="/settings">Settings</Link>
                        </div>

                        <div className="w-full mt-auto flex flex-col items-center space-y-2 mb-10">
                            {user?.status === "premium" && (
                            <p className="flex items-center justify-center gap-2 text-white text-[21px]">Premium User <img src="/assets/Screenshot_2025-07-10_104510-removebg-preview.png" alt="" className="w-6 h-6 object-contain flex pt-1"/></p>
                            )}
                        <div className="bg-[#626262] text-[20px] min-h-[5vh] w-full rounded-lg font-medium hover:bg-[#505050] flex items-center justify-center cursor-pointer" onClick={handleLogout}>
                                <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={toggleMenu}
                    ></div>
                    
                    {/* Mobile Menu */}
                    <div id='over-nav' className="lg:hidden fixed top-0 left-0 w-80 h-full bg-[#242424] z-50 transform transition-transform duration-300 overflow-y-auto">
                        {/* Mobile Menu Header */}
                        <div className="p-4 border-b border-gray-600 flex justify-between items-center">
                            <h1 className="text-white text-xl font-semibold">Todo-List</h1>
                            <button 
                                onClick={toggleMenu}
                                className="text-white p-2"
                                aria-label="Close menu"
                            >
                                <div className="w-6 h-0.5 bg-white transform rotate-45 absolute"></div>
                                <div className="w-6 h-0.5 bg-white transform -rotate-45"></div>
                            </button>
                        </div>

                        {/* Mobile Menu Content */}
                        <div className="p-4 text-white flex flex-col items-center">
                            <div className="w-24 h-24 mt-4 relative">
                                <img src={user?.avatar ? `${import.meta.env.VITE_API_URL_IMAGE}/storage/${user.avatar}` : "/src/assets/profile-default.png"} alt="" className="w-full h-full rounded-full outline-2 outline-white object-cover"/>
                            </div>
                            <p className="text-lg mt-3 font-medium">Greetings, {user.name}!</p>
                            
                            <div className="w-full mt-6 flex flex-col space-y-3">
                                <div className="bg-[#626262] text-lg py-3 px-4 rounded-lg font-medium hover:bg-[#505050] flex items-center justify-center cursor-pointer">
                                    <Link to="/dashboard">Dashboard</Link>
                                </div>
                                <div className="bg-[#626262] text-lg py-3 px-4 rounded-lg font-medium hover:bg-[#505050] flex items-center justify-center cursor-pointer">
                                    <p>History Goals</p>
                                </div>
                                <div className="bg-[#626262] text-lg py-3 px-4 rounded-lg font-medium hover:bg-[#505050] flex items-center justify-center cursor-pointer">
                                    <Link to="/settings" >Settings</Link>
                                </div>
                            </div>

                            <div className="w-full mt-8 flex flex-col items-center space-y-3">
                                {user?.status === "premium" && (
                                <p className="flex items-center justify-center gap-2 text-white text-lg">Premium User <img src="Screenshot_2025-07-10_104510-removebg-preview.png" alt="" className="w-5 h-5 object-contain"/></p>
                                )}
                                <div className="bg-[#626262] text-lg py-3 px-4 w-full rounded-lg font-medium hover:bg-[#505050] flex items-center justify-center cursor-pointer">
                                    <button onClick={handleLogout}>Sign Out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}