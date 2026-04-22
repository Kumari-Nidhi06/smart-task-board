import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TaskModal = ({ onClose, onAdd, status, editingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "Medium");
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAdd({
      id: editingTask ? editingTask.id : Date.now(), 
      title,
      description,
      priority,
      status: editingTask?.status || status || "todo",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-xl w-96 shadow-2xl"
      >
        <h2 className="text-lg font-semibold text-white mb-4">
          {editingTask ? "Edit Task" : "Add Task"}
        </h2>

        <input
          className="w-full mb-3 p-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-3 p-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full mb-4 p-2 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option className="text-black">High</option>
          <option className="text-black">Medium</option>
          <option className="text-black">Low</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition"
          >
            {editingTask ? "Update" : "Add"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskModal;
