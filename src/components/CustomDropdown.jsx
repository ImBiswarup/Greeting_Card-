import { useState } from "react";

export const CustomDropdown = ({ options, selectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option) => {
      onSelect(option);
      setIsOpen(false);
    };

    return (
      <div className="relative w-full">
        <button
          className="w-full h-10 border border-gray-300 rounded-lg pl-3 pr-3 text-left bg-purple-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || "Select a milestone"}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full border border-gray-300 bg-white rounded-lg mt-1 overflow-y-auto max-h-40">
            {options.map((option, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-purple-200 cursor-pointer"
                onClick={() => handleOptionClick(option.name)}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
