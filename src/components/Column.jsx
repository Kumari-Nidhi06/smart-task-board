import { useDroppable } from "@dnd-kit/core";

const Column = ({ id, title, children, onAdd }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        touchAction: "none", 
      }}
      className={`
        w-full sm:w-80 flex-shrink-0
        rounded-2xl p-4 backdrop-blur-xl border border-white/10 shadow-xl transition
        ${isOver ? "bg-blue-500/20 scale-[1.02]" : "bg-white/5"}
      `}
    >
      <h3 className="font-semibold mb-4 text-white">{title}</h3>

      {children}

      {onAdd && (
        <button
          onClick={onAdd}
          className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition"
        >
          + Add Task
        </button>
      )}
    </div>
  );
};

export default Column;
