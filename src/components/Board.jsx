/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import Column from "./Column";
import ConfirmModal from "./ConfirmModal";
import Stats from "./Stats";
import { getTasks, addTask, updateTask, deleteTask } from "../api/taskApi";
import GlassDropdown from "./GlassDropdown";

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("todo");
  const [editingTask, setEditingTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const columns = [
    { title: "To Do", key: "todo" },
    { title: "In Progress", key: "inprogress" },
    { title: "Done", key: "done" },
  ];

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSaveTask = async (task) => {
    if (editingTask) {
      //  TASK API
      const res = await updateTask(task.id, task);

      setTasks((prev) => prev.map((t) => (t.id === task.id ? res.data : t)));
    } else {
      // ADD TASK API
      const res = await addTask(task);

      setTasks((prev) => [...prev, res.data]);
    }

    setEditingTask(null);
    setShowModal(false);
  };

  const handleDeleteTask = async () => {
    await deleteTask(deleteId);

    setTasks((prev) => prev.filter((t) => t.id !== deleteId));

    toast.success("Task deleted 🗑️");
    setDeleteId(null);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedTaskId = active.id;
    const newStatus = over.id;

    const draggedTask = tasks.find((t) => t.id === draggedTaskId);

    // Confetti
    if (draggedTask?.status !== "done" && newStatus === "done") {
      confetti({
        particleCount: 300,
        spread: 180,
        origin: { x: 0.5, y: 0.5 },
      });
    }

    const updatedTasks = tasks.map((task) =>
      task.id === draggedTaskId ? { ...task, status: newStatus } : task,
    );

    setTasks(updatedTasks);

    const movedTask = updatedTasks.find((t) => t.id === draggedTaskId);
    await updateTask(movedTask.id, movedTask);
  };

  //  FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex-1 p-4 sm:p-6 overflow-x-auto">
        {/* SEARCH + FILTER BAR */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 w-full">
          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:flex-1 p-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none backdrop-blur-md"
          />

          {/* Status Dropdown */}
          <GlassDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="All Status"
            options={[
              { label: "All Status", value: "all" },
              { label: "To Do", value: "todo" },
              { label: "In Progress", value: "inprogress" },
              { label: "Done", value: "done" },
            ]}
          />

          {/* Priority Dropdown */}
          <GlassDropdown
            value={priorityFilter}
            onChange={setPriorityFilter}
            placeholder="All Priority"
            options={[
              { label: "All Priority", value: "all" },
              { label: "High", value: "High" },
              { label: "Medium", value: "Medium" },
              { label: "Low", value: "Low" },
            ]}
          />
        </div>

        <Stats tasks={tasks} />

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-white">
          {columns.map((col) => (
            <motion.div key={col.key} className="w-full sm:w-auto">
              <Column
                id={col.key}
                title={col.title}
                onAdd={
                  col.key === "todo"
                    ? () => {
                        setSelectedStatus(col.key);
                        setShowModal(true);
                      }
                    : null
                }
              >
                {filteredTasks.filter((task) => task.status === col.key)
                  .length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-6">
                    ✨ No tasks here <br />
                    <span className="text-xs">
                      Start by adding your first task 🚀
                    </span>
                  </p>
                )}

                {tasks
                  .filter((task) => task.status === col.key)
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={(t) => {
                        setEditingTask(t);
                        setSelectedStatus(t.status);
                        setShowModal(true);
                      }}
                      onDelete={(id) => setDeleteId(id)}
                    />
                  ))}
              </Column>
            </motion.div>
          ))}
        </div>

        {/* Task Modal */}
        {showModal && (
          <TaskModal
            status={selectedStatus}
            editingTask={editingTask}
            onClose={() => {
              setShowModal(false);
              setEditingTask(null);
            }}
            onAdd={handleSaveTask}
          />
        )}

        {/* Confirm Delete */}
        {deleteId && (
          <ConfirmModal
            onConfirm={handleDeleteTask}
            onCancel={() => setDeleteId(null)}
          />
        )}
      </div>
    </DndContext>
  );
};

export default Board;
