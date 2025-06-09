// SettingSelector.jsx
import React, { useRef, useEffect, useState } from 'react';

function SettingSelector({ value, onChange, placeholder = "Select Setting", settings = [] }) {
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
    // Check if current value is not in predefined settings
    if (value && !settings.includes(value)) {
      setCustomValue(value);
      setIsCustom(true);
    } else {
      setIsCustom(false);
    }
  }, [value, settings]);

  // Handle select value change
  const handleChange = (newValue) => {
    onChange({ target: { name: 'setting', value: newValue } });
    setIsOpen(false);
  };

  // Handle custom value input
  const handleCustomInput = (e) => {
    setCustomValue(e.target.value);
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onChange({ target: { name: 'setting', value: customValue } });
      setIsOpen(false);
    }
  };

  // Toggle custom input mode
  const toggleCustomMode = () => {
    setIsCustom(true);
  };

  const defaultSettings = [
    'Manor House', 
    'Cruise Ship', 
    'Ski Resort', 
    'Country Estate', 
    'University Campus',
    'Isolated Island',
    'Small Town',
    'Mountain Cabin',
    'Luxury Train',
    'Theater',
    'Museum',
    'Art Gallery',
    'Hotel'
  ];

  const settingsToUse = settings.length > 0 ? settings : defaultSettings;

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
          {settingsToUse.map((setting, index) => (
            <div 
              key={index}
              className="p-2 hover:bg-mystery-light/10 cursor-pointer"
              onClick={() => handleChange(setting)}
            >
              <span>{setting}</span>
            </div>
          ))}
          
          {/* Custom input option */}
          {!isCustom ? (
            <div 
              className="p-2 hover:bg-mystery-light/10 cursor-pointer text-mystery-accent/80"
              onClick={toggleCustomMode}
            >
              <span>+ Custom Setting</span>
            </div>
          ) : (
            <div className="p-2 bg-mystery-light/5">
              <input
                type="text"
                value={customValue}
                onChange={handleCustomInput}
                placeholder="Enter custom setting..."
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
      
      {/* Hidden actual select for form submission */}
      <select 
        name="setting"
        value={value || ''} 
        onChange={onChange} 
        className="opacity-0 absolute top-0 left-0 h-0 w-0"
        tabIndex="-1"
      >
        <option value="">{placeholder}</option>
        {settingsToUse.map((setting, index) => (
          <option key={index} value={setting}>
            {setting}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SettingSelector;
