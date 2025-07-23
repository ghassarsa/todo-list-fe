import { Link } from "react-router-dom";

function Navbar({ onOpenRegister, onOpenLogin }) {
    const scrollTo = (id) => {
    const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    return (
        <nav className="sticky top-0 z-50 bg-gray-50 shadow-lg max-w-[1563px] mx-auto">
            <div className="flex justify-between items-center py-4 px-4 md:px-10 lg:px-20 xl:px-40">
                <div className="flex items-center space-x-6">
                    <img className="h-auto w-[50px]" src="public\Untitled11_20250718132147.png" alt="" />
                    <a onClick={() => scrollTo('home')} className="font-normal text-[22px] text-gray-800">Home</a>
                    <a onClick={() => scrollTo('service')} className="font-normal text-[22px] text-gray-800">Service</a>
                    <a onClick={() => scrollTo('about')} className="font-normal text-[22px] text-gray-800">About</a>
                </div>

                <div className="flex space-x-6">
                    <div>
                        <button onClick={onOpenLogin} className="font-normal text-[22px] text-gray-800">Login</button>
                    </div>
                    <div>
                        <button onClick={onOpenRegister} className="font-normal text-[22px] text-gray-800">Register</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;