// CharacterRoleSelector.jsx
import React, { useRef, useEffect, useState } from 'react';

function CharacterRoleSelector({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  
  // Role color mapping with both background and text colors
  const roleStyles = {
    killer: { bg: 'bg-red-500', text: 'text-red-500', label: 'Potential Killer' },
    witness: { bg: 'bg-blue-500', text: 'text-blue-500', label: 'Key Witness' },
    redHerring: { bg: 'bg-yellow-500', text: 'text-yellow-500', label: 'Red Herring' },
    victim: { bg: 'bg-purple-500', text: 'text-purple-500', label: 'Victim' },
  };

  // Get style for current role
  const currentRoleStyle = value ? roleStyles[value] : { bg: 'bg-gray-400', text: 'text-gray-400', label: 'Not specified' };

  // Handle custom select open/close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle select value change
  const handleChange = (newValue) => {
    onChange({ target: { value: newValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={selectRef}>
      {/* Custom select display */}
      <div 
        className="w-full p-2 pl-8 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full ${currentRoleStyle.bg}`}></div>
        <span className={value ? currentRoleStyle.text : 'text-mystery-light'}>
          {currentRoleStyle.label}
        </span>
        <span className="ml-auto">▼</span>
      </div>

      {/* Custom dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-mystery-dark border border-mystery-light/20 rounded shadow-lg">
          <div 
            className="p-2 hover:bg-mystery-light/10 cursor-pointer flex items-center"
            onClick={() => handleChange('')}
          >
            <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
            <span>Not specified</span>
          </div>
          {Object.entries(roleStyles).map(([key, style]) => (
            <div 
              key={key}
              className="p-2 hover:bg-mystery-light/10 cursor-pointer flex items-center"
              onClick={() => handleChange(key)}
            >
              <div className={`w-3 h-3 rounded-full ${style.bg} mr-2`}></div>
              <span className={style.text}>{style.label}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Hidden actual select for form submission */}
      <select 
        value={value || ''} 
        onChange={onChange} 
        className="opacity-0 absolute top-0 left-0 h-0 w-0"
        tabIndex="-1"
      >
        <option value="">Not specified</option>
        <option value="killer">Potential Killer</option>
        <option value="witness">Key Witness</option>
        <option value="redHerring">Red Herring</option>
        <option value="victim">Victim</option>
      </select>
    </div>
  );
}

export default CharacterRoleSelector;
