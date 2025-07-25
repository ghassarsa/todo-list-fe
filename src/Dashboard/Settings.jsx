import NavbarDB from '../Dashboard/NavbarDB';
import axios from "axios";
import Swal from "sweetalert2";
import AuthController from "../controllers/AuthController";
import { useEffect, useState } from 'react';

function Settings() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        avatar: null,
    });
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setUser(res.data);
            if (res.data.avatar) {
              setAvatarPreview(
                `${import.meta.env.VITE_API_URL_IMAGE}/storage/${res.data.avatar}`
              );
            }
          } catch (err) {
            console.error("Gagal memuat profil", err);
          } finally {
            setLoading(false);
          }
        };

        fetchUser();
    }, []);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
          title: "Menyimpan...",
          text: "Mohon tunggu sebentar",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const token = localStorage.getItem("token");
          const formData = new FormData();
          formData.append("name", user.name);
          formData.append("email", user.email);
          if (avatarFile) {
            formData.append("avatar", avatarFile);
          }

          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/update`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          const updatedUser = response.data.user;

          localStorage.setItem("user", JSON.stringify(updatedUser));
          const updateUser = AuthController.getState().setUser;
          updateUser(updatedUser);

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Profile berhasil di perbarui",
          });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan, coba lagi nanti",
          });
        }
    };

    const handleDeleteAvatar = async () => {
        Swal.fire({
          title: "Menghapus...",
          text: "Mohon tunggu sebentar",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete-avatar`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const currentUser = AuthController.getState().user;
          const updatedUser = { ...currentUser, avatar: null };

          localStorage.setItem("user", JSON.stringify(updatedUser));
          const updateUser = AuthController.getState().setUser;
          updateUser(updatedUser);

          setAvatarPreview(null);
          setAvatarFile(null);

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Avatar berhasil dihapus",
          });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan, coba lagi nanti",
          });
        }
    };

    return [
        <>
            <div className="flex flex-col lg:flex-row min-h-screen">
                <NavbarDB />
                <div className="flex-1 p-15">
                    <div className='flex flex-wrap'>
                        <div className='w-50 h-50 max-sm:mx-auto'>
                            <img src={avatarPreview || "/src/assets/profile-default.png"} alt="avatar" className='w-full h-full outline-2 rounded-full object-cover'/>
                        </div>
                        <p className='text-[25px] font-semibold max-sm:mx-auto'>Profile Picture</p>
                        <label htmlFor="avatar-upload" className="cursor-pointer">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </label>
                        <input type="file" id="avatar-upload" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }}/>

                    </div>
                      <div className='mt-10 w-[34%] flex flex-col max-lg:w-[51%] max-md:w-[100%]'>
                    {loading ? (
                      <span className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
                        ) : (        
                        <form onSubmit={handleSubmit} className="w-full">
                        <input type='text' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} placeholder="Masukkan Nama" className="w-full px-4 py-2 border rounded-r-lg text-base" required/>
                        <input type='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Masukkan Email" className="w-full px-4 py-2 mt-5 border rounded-r-lg text-base" required/>
                        <div className='flex justify-between mt-5'>
                            <button type='button' onClick={handleDeleteAvatar} className='w-[40%] px-4 py-2 mt-5 bg-red-600 text-white rounded-l-lg max-sm:w-[45%]'>Delete Avatar</button>
                            <button className='w-[40%] px-4 py-2 mt-5 bg-red-600 text-white rounded-r-lg max-sm:w-[50%]'>Submit</button>
                        </div>
                        </form>
                        )}


                        <hr className='mt-5' />
                        <input type='password' name="old-password" placeholder="Masukkan Kata Sandi Lama" className="w-full px-4 py-2 mt-5 border rounded-r-lg text-base" required/>
                        <input type='text' name="new-password" placeholder="Masukkan Kata Sandi Baru" className="w-full px-4 py-2 mt-5 border rounded-r-lg text-base" required/>
                        <input type='email' name="confirm-password" placeholder="Konfirmasi Kata Sandi Baru" className="w-full px-4 py-2 mt-5 border rounded-r-lg text-base" required/>
                        <button className='w-[40%] px-4 py-2 mt-5 bg-red-600 text-white rounded-r-lg ml-auto max-sm:w-[50%]'>Submit</button>
                      </div>
                </div>
            </div>
        </>
    ]
}

export default Settings;