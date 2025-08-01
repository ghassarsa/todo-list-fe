import { useEffect, useState } from "react";
import TaskController from "../controllers/TaskController";
import NavbarDB from "./NavbarDB";
import { Link } from "react-router-dom";
import './Dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function History() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { task, getTask, restoreTask } = TaskController();

    const filteredTasks = task.filter((t) =>
      t.completed === "yes" &&
      t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <NavbarDB />
      <div className="flex-1 p-15 max-sm:p-4">
        <h1 className="text-4xl font-semibold">History Goals</h1>
        <div className="mt-6 mb-6">
          <input
            type="text"
            placeholder="Cari todo..."
            className="w-full px-4 py-2 border rounded-md text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Sedang memuat data...</div>
        ) : task.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-gray-600">Belum ada todo.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 items-stretch">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="w-[30%] h-[35vh] max-xl:w-[40%] max-xl:h-[50vh] max-lg:w-[45%] max-lg:h-[70vh] max-md:w-[100%] max-md:h-[100vh] max-sm:w-[100%] max-sm:h-[130vh] mt-2 flex flex-col"
                data-aos="fade-up"
              >
                {/* Header */}
                <div className="bg-[#313131] py-2 px-3 flex justify-between">
                  <Link
                    to={`/todo-list-detail/${task.id}`}
                    className="text-xl font-semibold mb-1 text-white hover:underline block"
                  >
                    {task.title.split(" ").slice(0, 2).join(" ")}{" "}
                    {task.title.split(" ").length > 2 ? "..." : ""}
                  </Link>
                    <div className="flex space-x-3">
                    <button
                        className="text-lg font-medium text-red-400 hover:underline hover:cursor-pointer"
                        onClick={() => restoreTask(task.id)}>
                          <i className="fa-solid fa-circle-minus"></i>
                        </button>
                    </div>
                </div>

                {/* Body */}
                <Link
                  to={`/todo-list-detail/${task.id}`}
                  className="bg-[#F1F1F1] p-3 flex-1 overflow-auto hide-scrollbar"
                >
                  <p>{task.description}</p>
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
    </div>
  );
}

export default History;