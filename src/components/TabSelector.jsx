// TabSelector.jsx
import React from 'react';

function TabSelector({ activeTab, setActiveTab }) {
  console.log('TabSelector rendered with activeTab:', activeTab);
  
  const handleTabChange = (tab) => {
    console.log('Changing tab to:', tab);
    setActiveTab(tab);
  };    return (
    <div className="flex border-b border-mystery-light/30 mb-6">
      <button
        className={`py-2 px-4 font-detective text-sm ${
          activeTab === 'story' 
            ? 'border-b-2 border-mystery-accent text-mystery-accent' 
            : 'text-mystery-light/70 hover:text-mystery-light'
        }`}
        onClick={() => handleTabChange('story')}
      >
        Story Settings
      </button>
      <button
        className={`py-2 px-4 font-detective text-sm ${
          activeTab === 'characters' 
            ? 'border-b-2 border-mystery-accent text-mystery-accent' 
            : 'text-mystery-light/70 hover:text-mystery-light'
        }`}
        onClick={() => handleTabChange('characters')}
      >
        Characters
      </button>
      <button
        className={`py-2 px-4 font-detective text-sm ${
          activeTab === 'relationships' 
            ? 'border-b-2 border-mystery-accent text-mystery-accent' 
            : 'text-mystery-light/70 hover:text-mystery-light'
        }`}
        onClick={() => handleTabChange('relationships')}
      >
        Relationships
      </button>      <button
        className={`py-2 px-4 font-detective text-sm ${
          activeTab === 'murderDetails' 
            ? 'border-b-2 border-mystery-accent text-mystery-accent' 
            : 'text-mystery-light/70 hover:text-mystery-light'
        }`}
        onClick={() => handleTabChange('murderDetails')}
      >
        Murder Details
      </button>
      <button
        className={`py-2 px-4 font-detective text-sm ${
          activeTab === 'timeline' 
            ? 'border-b-2 border-mystery-accent text-mystery-accent' 
            : 'text-mystery-light/70 hover:text-mystery-light'
        }`}
        onClick={() => handleTabChange('timeline')}
      >
        Timeline
      </button>
    </div>
  );
}

export default TabSelector;
