import { useContext, useState } from 'react';
import { AppContext } from '../context/Appcontext';

function MilestoneSelector({ index, milestoneObj, milestoneOptions, handleMilestoneChange, handleDeleteMilestone, milestonesList }) {
    // const { milestonesList, milestoneOptions, handleMilestoneChange, handleDeleteMilestone } = useContext(AppContext);
    return (
        <div>
            {/* {milestonesList.map((milestoneObj, index) => ( */}
            <MilestoneDropdown
                key={index}
                index={index}
                milestoneObj={milestoneObj}
                milestoneOptions={milestoneOptions}
                handleMilestoneChange={handleMilestoneChange}
                handleDeleteMilestone={handleDeleteMilestone}
            />
            {/* ))} */}
        </div>
    );
}

function MilestoneDropdown({ index, milestoneObj, milestoneOptions, handleMilestoneChange, handleDeleteMilestone }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOptions = milestoneOptions
        .filter(option => option.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    const handleOptionClick = (optionName) => {
        handleMilestoneChange(index, 'milestone', optionName);
        setSearchTerm(optionName); // Set the selected option in the input
        setIsOpen(false); // Close the dropdown
    };

    return (
        <div className="flex items-center justify-between gap-x-5 mt-2">
            {/* Custom Dropdown */}
            <div className="w-[45%] relative">
                <input
                    type="text"
                    placeholder="Search milestones"
                    value={searchTerm}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 150)} // Slight delay to ensure click registers
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg w-full h-8 pl-3 bg-purple-200"
                />

                {isOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, i) => (
                                <div
                                    key={i}
                                    onMouseDown={() => handleOptionClick(option.name)}
                                    className="px-3 py-1 hover:bg-purple-100 cursor-pointer"
                                >
                                    {option.name}
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-gray-500">No results found</div>
                        )}
                    </div>
                )}
            </div>

            <div className="w-[45%] flex items-center">
                <input
                    type="date"
                    value={milestoneObj.date || ""}
                    onChange={(e) => handleMilestoneChange(index, 'date', e.target.value)}
                    className="rounded h-10 pl-3 bg-purple-200 w-full"
                />
                <button onClick={() => handleDeleteMilestone(index)} className="ml-2">
                    🗑️
                </button>
            </div>
        </div>
    );
}

export default MilestoneSelector;
