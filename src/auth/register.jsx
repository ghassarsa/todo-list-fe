/* src/auth/Register.jsx */
import { useState } from "react";
import AuthController from "../controllers/AuthController";
import Swal from "sweetalert2";

export default function Register({ isOpen, onClose, onOpenLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const register = AuthController((state) => state.register);
  const error = AuthController((state) => state.error);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Register...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await register(form);
      Swal.fire({
        icon: "success",
        title: "Berhasil Register",
        text: "Pendaftaran berhasil, silakan login",
      }).then(() => {
        onClose();
        onOpenLogin();
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Register",
        text:
          err.response?.data?.message ||
          "Pendaftaran gagal, silahkan coba lagi nanti",
      });
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/15 z-40"
          onClick={onClose}
        />
      )}

      {/* Slide Panel */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          w-full sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4 overflow-y-auto hide-scrollbar`}
      >
        <div className="p-6 mt-12">
          <div className="flex items-center mx-auto my-auto gap-3">
            <button
              onClick={onClose}
              className="top-4 right-4 text-5xl text-gray-700"
            >
              <img src="close.png" alt="" className="w-5 h-5 object-contain" />
            </button>
            <hr className="flex-1 outline-1 bg-black" />
          </div>
          <div className="flex">
            <div className="w-px mt-3 ml-[9px] h-60 bg-black max-xl:h-40" />
            <div className="flex flex-col mx-auto items-center justify-center w-full">
              <img
                src="photo.png"
                alt=""
                className="w-[70%] max-xl:w-[50%] object-contain"
              />
              <h1 className="text-2xl max-xl:text-[20px]">Sign Up</h1>
              <form
                onSubmit={handleRegister}
                className="w-full flex flex-col items-center"
              >
                <div className="w-full flex flex-col mt-8 max-xl:mt-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your Name"
                    className="w-full px-4 py-2 max-xl:py-1 max-xl:px-0 max-xl:text-[15px] border rounded-md text-base "
                    required
                  />
                </div>
                <div className="w-full flex flex-col mt-4">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your Email Address"
                    className="w-full px-4 py-2 max-xl:py-1 max-xl:px-0 max-xl:text-[15px] border rounded-md text-base "
                    required
                  />
                </div>
                <div className="w-full flex flex-col mt-4">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    minLength={8}
                    placeholder="Enter your password..."
                    className="w-full px-4 py-2 max-xl:py-1 max-xl:px-0 max-xl:text-[15px] border rounded-md text-base "
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-12 py-2 max-xl:py-1.5 max-xl:text-[13px] bg-blue-700 text-white rounded-lg mt-6 font-semibold"
                >
                  Confirm
                </button>
                <div className="flex flex-row gap-1 mt-4 max-xl:text-[13px] max-xl:mt-1">
                  <p>Already have an account?</p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenLogin();
                    }}
                    className="text-blue-700"
                  >
                    Sign In
                  </button>
                </div>
                {error && (
                  <div className="mt-4">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
