import { useEffect, useState } from "react";
import TaskController from "../controllers/TaskController";
import NavbarDB from "./NavbarDB";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import './Dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
      title: "",
      description: "",
      deadline: "",
      video: "",
      image: null,
    });

    const { task, getTask, storeTask, clearMessage, deleteTask, validateTask } = TaskController();


    const filteredTasks = task.filter((t) =>
      t.completed === "no" &&
      t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleStoreTask = async (e) => {
      e.preventDefault();

      Swal.fire({
        title: editId ? "Menyimpan perubahan..." : "Menyimpan...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      try {
        await storeTask(formData, null, editId);
        await getTask();
        setForm({
          title: "",
          description: "",
          deadline: "",
          video: "",
          image: null,
        });
        setEditId(null);
        setModal(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: editId
            ? "Perubahan berhasil disimpan"
            : "Todo berhasil ditambahkan",
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menyimpan task.",
        });
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);

        try {
          await getTask();
        } catch (error) {
          console.error("Gagal mengambil task:", error);
        }

        setLoading(false);
      };

      fetchData();
    }, [getTask]);

    const extractYouTubeId = (url) => {
      const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
      );
      return match ? match[1] : null;
    };

    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
      clearMessage();
    };

    const openAddModal = () => {
      const isPremium = localStorage.getItem("user_status") === "premium";
      if (!isPremium && task.length >= 1) {
        Swal.fire({
          title: "Upgrade ke Premium",
          text: "Akun gratis hanya bisa menambahkan 1 todo. Upgrade ke premium sekarang?",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Lihat Plan",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/plans";
          }
        });

        return;
      }

      setForm({
        title: "",
        description: "",
        deadline: "",
        video: "",
        image: null,
      });
      setEditId(null);
      setModal(true);
    };

    const openEditModal = async (task) => {
      setEditId(true);
      setEditId(task.id);
      setForm({
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        video: task.video || "",
        image: null,
      });
      setModal(true);
    };

    const handleDelete = async (id) => {
      const result = await Swal.fire({
        title: "Yakin ingin menghapus?",
        text: "Data tidak bisa dikembalikan setelah dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: "Menghapus...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          await deleteTask(id);
          await getTask();
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Todo berhasil dihapus.",
          });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan saat menghapus.",
          });
        }
      }
    };

    const [showSearchDrawer, setShowSearchDrawer] = useState(false);
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
        <NavbarDB />
            <div className="flex-1 p-15 max-sm:p-4">
                <h1 className="text-4xl font-semibold">Your Goals</h1>
                <div className="mt-10 flex flex-row gap-4">
                    <button onClick={() => openAddModal()} className="px-6 sm:px-10 lg:px-16 py-2 bg-[#7F7F7F] text-base sm:text-lg lg:text-xl text-white font-semibold rounded-lg">Add Todo</button>
                    {modal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6 backdrop-blur">
                      <div
                        className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md"
                        data-aos="fade-up"
                        data-aos-duration="500"
                      >
                        <h2 className="text-xl text-white font-bold mb-4">
                          {editId ? "Edit Todo" : "Tambah Todo"}
                        </h2>
                        <form onSubmit={handleStoreTask}>
                          <div className="mb-3">
                            <label className="block text-white mb-1">Judul</label>
                            <input
                              type="text"
                              name="title"
                              value={form.title}
                              onChange={handleChange}
                              className="w-full border border-white text-white px-3 py-2 rounded"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="block text-white mb-1">Deskripsi</label>
                            <textarea
                              name="description"
                              value={form.description}
                              onChange={handleChange}
                              className="w-full border border-white text-white px-3 py-2 rounded"
                              rows="3"
                              required
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label className="block text-white mb-1">
                              Gambar (opsional)
                            </label>
                            <input
                              type="file"
                              name="image"
                              onChange={handleChange}
                              accept="image/*"
                              className="w-full border border-white text-white px-3 py-2 rounded"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="block text-white mb-1">
                              Link Video YouTube (opsional)
                            </label>
                            <input
                              type="url"
                              name="video"
                              value={form.video}
                              onChange={handleChange}
                              className="w-full border border-white text-white px-3 py-2 rounded"
                            />
                          </div>
                          <div className="flex justify-end gap-3 mt-4">
                            <button
                              type="button"
                              onClick={() => setModal(false)}
                              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                            >
                              Batal
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded bg-yellow-400 text-white hover:bg-yellow-500"
                            >
                              Simpan
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    )}

                    <div className="relative flex-1 hidden md:block">
                        <input type="text" placeholder="Cari todo..." className="w-full px-4 py-2 border rounded-md text-base" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                        <img src="search.png" alt="search" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5"/>
                    </div>

                    {/* Mobile */}
                    <div className="block md:hidden ml-auto my-auto">
                        <button onClick={() => setShowSearchDrawer(true)} className="rounded-md">
                            <img src="search.png" alt="Search" className="rounded-md h-9 w-10 object-cover select-none" draggable="false"/>
                        </button>
                    </div>
                </div>

                {searchTerm && (<p className="md:hidden text-center mt-3">Hasil pencarian: {searchTerm}</p>)}

                
                {/* Todo List */}
                {loading ? (
                  <div className="text-center text-gray-500">Sedang memuat data...</div>
                ) : task.length === 0 ? (
                  <div className="bg-white p-6 rounded shadow text-center">
                    <p className="text-gray-600">Belum ada todo.</p>
                  </div>
                ) : (
                <div className="flex flex-wrap gap-4 items-stretch">
                    {filteredTasks.map((task) => (
                <div key={task.id} className="w-[30%] h-[35vh] max-xl:w-[40%] max-xl:h-[50vh] max-lg:w-[45%] max-lg:h-[70vh] max-md:w-[100%] max-md:h-[100vh] max-sm:w-[100%] max-sm:h-[130vh] mt-8 flex flex-col" data-aos="fade-up">
                  <div className="bg-[#313131] py-2 px-3 flex justify-between">
                <Link to={`/todo-list-detail/${task.id}`} className="text-xl font-semibold mb-1 text-white hover:underline w-full">  {task.title.split(" ").slice(0, 2).join(" ")} {task.title.split(" ").length > 2 ? "..." : ""}</Link>
                    <div className="flex space-x-3 mb-auto">
                    <button
                      className="text-lg font-medium text-primary hover:underline hover:cursor-pointer"
                      onClick={() => openEditModal(task)}
                    >
                      <i className="fa-regular fa-pen-to-square text-green-500"></i>
                    </button>
                    <button
                      className="text-lg font-medium text-red-600 hover:underline hover:cursor-pointer"
                      onClick={() => handleDelete(task.id)}
                    >
                      <i class="fa-regular fa-trash-can"></i>
                    </button>
                    <button
                      className="text-lg font-medium text-yellow-200 hover:underline hover:cursor-pointer"
                      onClick={() => validateTask(task.id)}
                    >
                    <i class="fa-solid fa-circle-check"></i>
                    </button>
                  </div>
                  </div>
                  <Link to={`/todo-list-detail/${task.id}`} className="bg-[#F1F1F1] p-3 flex-1 overflow-auto hide-scrollbar">
                    <p className="">
                      {task.description}
                    </p>
                {task.video && extractYouTubeId(task.video) ? (
                  <div className="mt-3">
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYouTubeId(
                        task.video
                      )}`}
                      className="w-full h-48 rounded"
                      frameBorder="0"
                      allowFullScreen
                      title="Video Preview"
                    ></iframe>
                    </div>
                    ) : task.image ? (
                      <img
                        src={task.image}
                        alt="Preview"
                        className="mt-3 w-full h-48 object-cover rounded"
                      />
                    ) : (
                      <img
                        src="/public/default-featured-image.png.jpg"
                        alt="Preview"
                        className="mt-3 w-full h-48 object-cover rounded"
                      />
                    )}
                  </Link>
                </div>
               ))}
              </div>
            )}
            </div>

            {/* Memunculkan Overlay Search Mobile */}
            <input type="text" className={`fixed top-[80px] left-1/2 -translate-x-1/2 w-[80%] h-0 sm:w-[80%] bg-white shadow-lg z-50 p-6 rounded-lg transition-opacity duration-300 ease-in-out outline-1 outline-[#242424] ${showSearchDrawer ? "opacity-100 visible" : "opacity-0 invisible"}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") {
              setShowSearchDrawer(false);
              }
            }}/>

            {/* BACKGROUND OPACITY HITAM */}
            {showSearchDrawer && (
            <div className="fixed inset-0 bg-black/75 z-40 transition-opacity duration-300" onClick={() => setShowSearchDrawer(false)}>
                
            </div>)}




        </div>
    )
}

export default Dashboard;