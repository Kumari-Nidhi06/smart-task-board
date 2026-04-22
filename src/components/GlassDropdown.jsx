import { useState, useRef, useEffect } from "react";

const GlassDropdown = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} className="relative w-full sm:w-auto">
      
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white flex justify-between items-center backdrop-blur-md"
      >
        {selectedOption ? selectedOption.label : placeholder}

        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-3 py-2 text-white hover:bg-white/20 cursor-pointer transition"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlassDropdown;