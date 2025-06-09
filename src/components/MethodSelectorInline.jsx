// MethodSelectorInline.jsx
import React, { useRef, useEffect, useState } from 'react';

function MethodSelectorInline({ value, onChange, placeholder = "Select Method" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [isCustom, setIsCustom] = useState(false);
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

  useEffect(() => {
    // Check if current value is not in predefined methods
    if (value && !murderMethods.includes(value)) {
      setCustomValue(value);
      setIsCustom(true);
    } else {
      setIsCustom(false);
    }
  }, [value]);

  // Handle select value change
  const handleChange = (newValue) => {
    onChange({ target: { name: 'murderMethod', value: newValue } });
    setIsOpen(false);
  };

  // Handle custom value input
  const handleCustomInput = (e) => {
    setCustomValue(e.target.value);
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onChange({ target: { name: 'murderMethod', value: customValue } });
      setIsOpen(false);
    }
  };

  // Toggle custom input mode
  const toggleCustomMode = () => {
    setIsCustom(true);
  };

  const murderMethods = [
    'Poisoning', 
    'Gunshot', 
    'Stabbing', 
    'Strangulation', 
    'Blunt force trauma',
    'Drowning',
    'Suffocation',
    'Pushed from height',
    'Electrocution',
    'Explosion'
  ];

  return (
    <div className="relative" ref={selectRef}>
      {/* Custom select display */}      
      <div 
        className="w-full p-2 pl-4 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-mystery-light">
          {value || placeholder}
        </span>
        <span className="ml-auto">▼</span>
      </div>

      {/* Custom dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-mystery-dark border border-mystery-light/20 rounded shadow-lg max-h-56 overflow-y-auto">
          <div 
            className="p-2 hover:bg-mystery-light/10 cursor-pointer text-mystery-light/70 italic"
            onClick={() => handleChange('')}
          >
            <span>None (Random Method)</span>
          </div>
          
          {murderMethods.map((method, index) => (
            <div 
              key={index}
              className="p-2 hover:bg-mystery-light/10 cursor-pointer"
              onClick={() => handleChange(method)}
            >
              <span>{method}</span>
            </div>
          ))}
          
          {/* Custom input option */}
          {!isCustom ? (
            <div 
              className="p-2 hover:bg-mystery-light/10 cursor-pointer text-mystery-accent/80"
              onClick={toggleCustomMode}
            >
              <span>+ Custom Method</span>
            </div>
          ) : (
            <div className="p-2 bg-mystery-light/5">
              <input
                type="text"
                value={customValue}
                onChange={handleCustomInput}
                placeholder="Enter custom method..."
                className="w-full p-1 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent"
                onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                autoFocus
              />
              <button
                type="button"
                className="mt-1 px-2 py-1 bg-mystery-accent/70 text-mystery-dark text-sm rounded hover:bg-mystery-accent w-full"
                onClick={handleCustomSubmit}
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Hidden actual input for form submission */}
      <input 
        type="text"
        name="murderMethod"
        value={value || ''} 
        onChange={onChange} 
        className="opacity-0 absolute top-0 left-0 h-0 w-0"
        tabIndex="-1"
      />
    </div>
  );
}

export default MethodSelectorInline;
