import { Pencil, Trash2, GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 999 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white/10 backdrop-blur-xl p-4 rounded-xl shadow-md mb-3 border border-white/10 hover:bg-white/20 transition-all duration-300 select-none touch-none"
      >
        {/* Top Row */}
        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              task.priority === "High"
                ? "bg-red-500/20 text-red-300"
                : task.priority === "Medium"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : "bg-green-500/20 text-green-300"
            }`}
          >
            {task.priority}
          </span>

          {/* Drag Handle  */}
          <div
            {...listeners}
            {...attributes}
            className="cursor-grab text-gray-400 opacity-60 hover:opacity-100 transition p-1"
          >
            <GripVertical size={18} />
          </div>
        </div>

        <h4 className="font-semibold text-white/90">{task.title}</h4>

        <p className="text-sm text-gray-300 mt-1 line-clamp-2">
          {task.description}
        </p>

        <div className="flex justify-end gap-3 mt-3">
          <button onClick={() => onEdit(task)}>
            <Pencil
              size={16}
              className="text-blue-400 hover:text-blue-300 transition"
            />
          </button>

          <button onClick={() => onDelete(task.id)}>
            <Trash2
              size={16}
              className="text-red-400 hover:text-red-300 transition"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;