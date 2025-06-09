// EraSelector.jsx
import React, { useRef, useEffect, useState } from 'react';

function EraSelector({ value, onChange, placeholder = "Select Time Period" }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  
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
    onChange({ target: { name: 'era', value: newValue } });
    setIsOpen(false);
  };

  // Get display name for era value
  const getEraDisplayName = (eraValue) => {
    const eraMap = {
      'victorian': 'Victorian Era',
      '1920s': '1920s',
      '1950s': '1950s',
      'modern': 'Modern Day',
      'future': 'Future'
    };
    
    return eraValue ? eraMap[eraValue] || eraValue : placeholder;
  };

  const eras = [
    { value: 'victorian', label: 'Victorian Era' },
    { value: '1920s', label: '1920s' },
    { value: '1950s', label: '1950s' },
    { value: 'modern', label: 'Modern Day' },
    { value: 'future', label: 'Future' }
  ];

  return (
    <div className="relative" ref={selectRef}>
      {/* Custom select display */}      
      <div 
        className="w-full p-2 pl-4 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-mystery-light">
          {getEraDisplayName(value)}
        </span>
        <span className="ml-auto">▼</span>
      </div>

      {/* Custom dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-mystery-dark border border-mystery-light/20 rounded shadow-lg max-h-56 overflow-y-auto">
          {eras.map((era, index) => (
            <div 
              key={index}
              className="p-2 hover:bg-mystery-light/10 cursor-pointer"
              onClick={() => handleChange(era.value)}
            >
              <span>{era.label}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Hidden actual select for form submission */}
      <select 
        name="era"
        value={value || ''} 
        onChange={onChange} 
        className="opacity-0 absolute top-0 left-0 h-0 w-0"
        tabIndex="-1"
      >
        {eras.map((era, index) => (
          <option key={index} value={era.value}>
            {era.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EraSelector;
