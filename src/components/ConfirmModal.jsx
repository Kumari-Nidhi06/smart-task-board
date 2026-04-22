/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-xl w-80 shadow-xl"
      >
        {/* Title */}
        <h2 className="text-lg font-semibold text-white mb-2">Delete Task</h2>

        {/* Message */}
        <p className="text-sm text-gray-300 mb-4">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500/80 text-white hover:bg-red-500 transition"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;
