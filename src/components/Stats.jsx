const Stats = ({ tasks }) => {
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inprogress = tasks.filter((t) => t.status === "inprogress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="mb-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl shadow border-l-[4px] !border-l-gray-300">
          <p className="text-gray-400 text-sm">Total Tasks</p>
          <h2 className="text-2xl font-bold text-white">{total}</h2>
        </div>

        {/* To Do */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl shadow border-l-[4px] !border-l-blue-400">
          <p className="text-blue-400 text-sm">To Do</p>
          <h2 className="text-2xl font-bold text-blue-400">{todo}</h2>
        </div>

        {/* In Progress */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl shadow border-l-[4px] !border-l-yellow-400">
          <p className="text-yellow-400 text-sm">In Progress</p>
          <h2 className="text-2xl font-bold text-yellow-400">{inprogress}</h2>
        </div>

        {/* Done */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl shadow border-l-[4px] !border-l-green-400">
          <p className="text-green-400 text-sm">Done</p>
          <h2 className="text-2xl font-bold text-green-400">{done}</h2>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow">
        <p className="text-gray-300 mb-2 font-medium">Project Progress</p>

        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full transition-all duration-700 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 shadow-[0_0_15px_rgba(34,197,94,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-400 mt-2">{progress}% Completed</p>
      </div>
    </div>
  );
};

export default Stats;
