// ComplexitySelector.jsx
import React, { useRef, useEffect, useState } from 'react';

function ComplexitySelector({ value, onChange, placeholder = "Select Complexity" }) {
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
    onChange({ target: { name: 'complexity', value: newValue } });
    setIsOpen(false);
  };

  // Get display name for complexity value
  const getComplexityDisplayName = (complexityValue) => {
    const complexityMap = {
      'simple': 'Simple',
      'medium': 'Medium',
      'complex': 'Complex'
    };
    
    return complexityValue ? complexityMap[complexityValue] || complexityValue : placeholder;
  };

  // Get description for complexity level
  const getComplexityDescription = (complexityValue) => {
    const descriptions = {
      'simple': 'Straightforward plot with clear clues',
      'medium': 'Moderate complexity with some twists',
      'complex': 'Intricate plot with multiple red herrings'
    };
    
    return descriptions[complexityValue] || '';
  };

  const complexityLevels = [
    { value: 'simple', label: 'Simple' },
    { value: 'medium', label: 'Medium' },
    { value: 'complex', label: 'Complex' }
  ];

  return (
    <div className="relative" ref={selectRef}>
      {/* Custom select display */}      
      <div 
        className="w-full p-2 pl-4 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-mystery-light">
          {getComplexityDisplayName(value)}
        </span>
        <span className="ml-auto">▼</span>
      </div>

      {/* Custom dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-mystery-dark border border-mystery-light/20 rounded shadow-lg max-h-56 overflow-y-auto">
          {complexityLevels.map((level, index) => (
            <div 
              key={index}
              className="p-2 hover:bg-mystery-light/10 cursor-pointer"
              onClick={() => handleChange(level.value)}
            >
              <div className="flex flex-col">
                <span className="font-medium">{level.label}</span>
                <span className="text-xs text-mystery-light/60">{getComplexityDescription(level.value)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Hidden actual select for form submission */}
      <select 
        name="complexity"
        value={value || ''} 
        onChange={onChange} 
        className="opacity-0 absolute top-0 left-0 h-0 w-0"
        tabIndex="-1"
      >
        {complexityLevels.map((level, index) => (
          <option key={index} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ComplexitySelector;
