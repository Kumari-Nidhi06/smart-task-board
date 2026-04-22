import { Home, Layout, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "boards", label: "Boards", icon: Layout },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 250 }}
      className="h-full bg-gray-900 text-white p-3 flex flex-col transition-all duration-300"
    >
      {/* Top Section */}
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <h2 className="text-lg font-bold tracking-wide">⚡ Workspace</h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-white/10"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all
                ${isActive ? "bg-white/10" : "hover:bg-white/5"}
              `}
            >
              <Icon size={20} />

              {/* Label */}
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}

              {/* Tooltip */}
              {collapsed && (
                <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom */}
      {!collapsed && (
        <div className="mt-auto text-xs text-gray-400 pt-6">
          <p>🚀 Smart Board</p>
          <p>v1.0.0</p>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;