import React, { useState, useEffect } from 'react';
import TabSelector from './TabSelector.jsx';
import CharacterEditor from './CharacterEditor.jsx';
import CharacterRelationshipsTab from './CharacterRelationshipsTab.jsx';
import MurderDetailsTab from './MurderDetailsTab.jsx';
import TimelineTab from './TimelineTab.jsx';
import SettingSelector from './SettingSelector.jsx';
import EraSelector from './EraSelector.jsx';
import ComplexitySelector from './ComplexitySelector.jsx';
import MethodSelectorInline from './MethodSelectorInline.jsx';

function CustomizationForm({ storyParams, setStoryParams, onGenerate, isGenerating }) {
  console.log('CustomizationForm rendered', { storyParams });
  const [activeTab, setActiveTab] = useState('story');  const [characterData, setCharacterData] = useState(Array(20).fill().map(() => ({
    name: '',
    personality: '',
    secrets: '',
    motives: '',
    role: '',
    relationships: {}
  })));

  // Initialize character data when component mounts or when storyParams changes
  useEffect(() => {    const newData = Array(20).fill().map(() => ({
      name: '',
      personality: '',
      secrets: '',
      motives: '',
      role: '',
      relationships: {}
    }));
    
    // If we have characterDetails, use them
    if (storyParams.characterDetails && storyParams.characterDetails.length > 0) {
      storyParams.characterDetails.forEach((details, index) => {
        if (details) {
          newData[index] = { ...newData[index], ...details };
        }
      });
    } 
    // Otherwise, if we have characterNames, use those
    else if (storyParams.characterNames && storyParams.characterNames.length > 0) {
      storyParams.characterNames.forEach((name, index) => {
        if (name) {
          newData[index] = { ...newData[index], name };
        }
      });
    }
    
    setCharacterData(newData);
  }, [storyParams.characterDetails, storyParams.characterNames]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoryParams(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div>
      <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'story' && (
        <form className="space-y-4">          <div>
            <label className="block text-mystery-light/90 mb-2">Setting</label>
            <SettingSelector
              value={storyParams.setting}
              onChange={handleChange}
              placeholder="Select a setting (Manor house, cruise ship, etc.)"
            />
          </div>
            <div>
            <label className="block text-mystery-light/90 mb-2">Time Period</label>
            <EraSelector
              value={storyParams.era}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-mystery-light/90 mb-2">Number of Characters</label>
            <input
              type="range"
              name="characterCount"
              min="3"
              max="20"
              value={storyParams.characterCount}
              onChange={handleChange}
              className="w-full accent-mystery-accent"
            />
            <div className="text-center text-mystery-light/80">{storyParams.characterCount}</div>
          </div>
            <div>
            <label className="block text-mystery-light/90 mb-2">Murder Method (optional)</label>
            <MethodSelectorInline
              value={storyParams.murderMethod}
              onChange={handleChange}
              placeholder="Select a method (or leave blank for random)"
            />
          </div>
            <div>
            <label className="block text-mystery-light/90 mb-2">Complexity</label>
            <ComplexitySelector
              value={storyParams.complexity}
              onChange={handleChange}
            />
          </div>
        </form>
      )}
        {activeTab === 'characters' && (
        <CharacterEditor 
          storyParams={storyParams}
          setStoryParams={setStoryParams}
          characterData={characterData}
          setCharacterData={setCharacterData}
        />
      )}
        {activeTab === 'relationships' && (
        <CharacterRelationshipsTab
          storyParams={storyParams}
          setStoryParams={setStoryParams}
          characterData={characterData}
          setCharacterData={setCharacterData}
        />
      )}
        {activeTab === 'murderDetails' && (
        <MurderDetailsTab
          storyParams={storyParams}
          setStoryParams={setStoryParams}
          characterData={characterData}
        />
      )}
      
      {activeTab === 'timeline' && (
        <TimelineTab
          storyParams={storyParams}
          setStoryParams={setStoryParams}
        />
      )}
      
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full mt-8 py-3 px-4 bg-mystery-accent hover:bg-mystery-accent/90 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Crafting Mystery...' : 'Generate Mystery'}
      </button>
    </div>
  );
}

export default CustomizationForm;
