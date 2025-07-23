import axios from "axios";
import { create } from 'zustand';

const api = import.meta.env.VITE_API_URL;

const TaskController = create((set) => ({
    task: [],
    error: null,
    success: null,

    getTask: async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(`${api}/task/index`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            set({task: res.data.task, error: null});
        } catch (err) {
            const message = err.response?.data?.message || "Gagal mengambil data todo";
            set({ error: message, task: [] });
        }
    },

    clearMessage: () => set({error: null, success: null})
}));

export default TaskController;