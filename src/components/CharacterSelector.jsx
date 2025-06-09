// CharacterSelector.jsx
import React, { useRef, useEffect, useState } from 'react';

function CharacterSelector({ value, onChange, characters, placeholder = "Select Character" }) {
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
    onChange({ target: { value: newValue } });
    setIsOpen(false);
  };

  // Get the selected character's name
  const getSelectedCharacterName = () => {
    if (!value && value !== 0) return placeholder;
    const selectedChar = characters[value];
    return selectedChar?.name || `Character #${parseInt(value) + 1}`;
  };

  return (
    <div className="relative" ref={selectRef}>
      {/* Custom select display */}      
      <div 
        className="w-full p-2 pl-4 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-mystery-light">
          {getSelectedCharacterName()}
        </span>
        <span className="ml-auto">▼</span>
      </div>

      {/* Custom dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-mystery-dark border border-mystery-light/20 rounded shadow-lg max-h-56 overflow-y-auto">          
          <div 
            className="p-2 hover:bg-mystery-light/10 cursor-pointer"
            onClick={() => handleChange('')}
          >
            <span>{placeholder}</span>
          </div>
          {characters.map((char, index) => (
            <div 
              key={index}
              className="p-2 hover:bg-mystery-light/10 cursor-pointer"
              onClick={() => handleChange(index.toString())}
            >
              <span>{char?.name || `Character #${index + 1}`}</span>
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
        <option value="">{placeholder}</option>
        {characters.map((char, index) => (
          <option key={index} value={index}>
            {char?.name || `Character #${index + 1}`}
          </option>
        ))}
      </select>
    </div>  );
}

export default CharacterSelector;
