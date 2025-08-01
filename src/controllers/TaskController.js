import axios from "axios";
import { create } from "zustand";
import Swal from "sweetalert2";

const api = import.meta.env.VITE_API_URL;

const TaskController = create((set) => ({
  task: [],
  error: null,
  success: null,

  getTask: async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${api}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ task: res.data, error: null });
    } catch (err) {
      const message = err.response?.data?.message || "Gagal mengambil data todo";
      set({ error: message, task: [] });
    }
  },

  getTaskById: async (id) => {
    try {
      const token = localStorage.getItem("token");
    
      const res = await axios.get(`${api}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      return res.data; // Pastikan API mengembalikan description
    } catch (err) {
      const message = err.response?.data?.message || "Gagal mengambil detail task";
      set({ error: message });
      return null;
    }
  },

  storeTask: async (formData, navigate, id = null) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        id ? `${api}/tasks/${id}` : `${api}/tasks`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      set({
        success: "Task berhasil disimpan",
        error: null,
      });

      navigate && navigate("/todo-list");
    } catch (err) {
      const message = err.response?.data?.message || "Gagal menyimpan task. Silakan coba lagi.";
      set({ error: message, success: null });
    }
  },

  validateTask: async (id) => {
    const confirm = await Swal.fire({
      title: "Apakah anda yakin?",
      text: "Apakah anda yakin ingin menyelesaikan tugas anda?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Selesaikan",
      cancelButtonText: "Batal",
      reverseButtons: true
    });

    if (!confirm.isConfirmed) {
      return; // Jika user klik Batal, hentikan
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${api}/tasks/${id}/complete`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        task: state.task.map((t) =>
          t.id === id ? { ...t, completed: "yes" } : t
        ),
        success: res.data.message,
        error: null,
      }));

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Task berhasil diselesaikan!",
        timer: 1500,
        showConfirmButton: false
      });

    } catch (err) {
      const message = err.response?.data?.message || "Gagal menyelesaikan task";
      set({ error: message });
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: message,
      });
    }
  },

  restoreTask: async (id) => {
    const confirm = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Task ini akan dikembalikan ke status belum selesai.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Kembalikan",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${api}/tasks/${id}/restore`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      set((state) => ({
        task: state.task.map((t) =>
          t.id === id ? { ...t, completed: "no" } : t
        ),
        success: res.data.message,
        error: null,
      }));

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Task berhasil dikembalikan!",
        timer: 1500,
        showConfirmButton: false,
      });
      } catch (err) {
        console.error("Error saat restore task:", err);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat mengembalikan task.",
        });
      }
  },

  deleteTask: async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(`${api}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        task: state.task.filter((task) => task.id !== id),
        success: res.data.message,
        error: null,
      }));
    } catch (err) {
      const message = err.response?.data?.message || "Gagal menghapus task";
      set({ error: message });
    }
  },

  clearMessage: () => set({ error: null, success: null }),
}));

export default TaskController;