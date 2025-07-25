import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthController from "../controllers/AuthController";
import Swal from "sweetalert2";

export default function Login({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = AuthController((state) => state.login);
    const error = AuthController((state) => state.error);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
        
    Swal.fire({
      title: "Login...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    
    try {
      await login(email, password, navigate);
        Swal.fire({
          icon: "success",
          title: "Berhasil Login",
          text: "Selamat datang kembali",
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal Login",
          text: err.response?.data?.message || "Email atau password salah",
        });
      }
    };

    return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/15 z-40" onClick={onClose} />}

      {/* Slide Panel */}
      <div className={`fixed top-0 left-0 h-full w-1/4 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="p-6 mt-12">
          <div className='flex items-center mx-auto my-auto gap-3'>
            <button onClick={onClose} className="top-4 right-4 text-5xl text-gray-700"><img src="close.png" alt="" className='w-5 h-5 object-contain'/></button>
            <hr className='flex-1 outline-1 bg-black' />
          </div>
          <div className='flex'>
            <div className="w-px mt-3 ml-[9px] h-60 bg-black" />
              <div className='flex flex-col mx-auto items-center justify-center'>
                <img src="photo.png" alt="" className='w-[70%] object-contain'/>
                <h1 className='text-2xl'>Sign In</h1>
                  <form onSubmit={handleLogin} className='w-full flex flex-col items-center'>         
                    <div className='w-full flex flex-col mt-8'>
                      <label >Email Address</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email Address" className="w-full px-4 py-2 border rounded-md text-base" required/>
                    </div>
                    <div className='w-full flex flex-col mt-4'>
                      <label >Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} placeholder="Enter your password..." className="w-full px-4 py-2 border rounded-md text-base" required/>
                    </div>
                    <button className='px-12 py-2 bg-blue-700 text-white rounded-lg mt-6 font-semibold'>Confirm</button>
                    <div className='flex flex-row gap-1'>
                      <p>Doesn't have an account?</p>
                      <a href="" className='text-blue-700'>Sign Up</a>
                    </div>
                    <div className="mt-4">
                        {error && <p className="text-red-600">{error}</p>}
                    </div>
                  </form>
                  
            </div>
          </div>
        </div>
      </div>
    </>
  );
}