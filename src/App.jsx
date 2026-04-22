import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">

      {/* Header */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">

        {/* 🔥 Sidebar (Responsive) */}
        <div
          className={`
            fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900
            transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:relative md:translate-x-0
          `}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* 🔥 Overlay (Mobile only) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 🔥 Board */}
        <div className="flex-1 overflow-auto">
          <Board />
        </div>

      </div>
    </div>
  );
}

export default App;