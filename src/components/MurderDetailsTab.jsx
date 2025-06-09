// MurderDetailsTab.jsx
import React, { useState, useEffect } from 'react';
import CharacterSelector from './CharacterSelector';
import MethodSelector from './MethodSelector';

function MurderDetailsTab({ characterData, storyParams, setStoryParams }) {
  const [murderDetails, setMurderDetails] = useState({
    realKiller: '',
    method: '',
    description: ''
  });

  // Load murder details from story params if they exist
  useEffect(() => {
    if (storyParams.murderDetails) {
      setMurderDetails(storyParams.murderDetails);
    }
  }, [storyParams.murderDetails]);

  // Get potential killers from character data
  const getPotentialKillers = () => {
    return characterData
      .slice(0, storyParams?.characterCount || 0)
      .filter(char => char && char.role === 'killer')
      .map((_, index) => index);
  };

  // Update murder details in story params
  const handleChange = (field, value) => {
    const updatedDetails = { ...murderDetails, [field]: value };
    setMurderDetails(updatedDetails);
    
    // Update story params
    setStoryParams(prev => ({
      ...prev,
      murderDetails: updatedDetails
    }));
  };

  // Method options for the dropdown
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

  // Check if there are potential killers
  const potentialKillers = getPotentialKillers();
  const hasKillers = potentialKillers.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-mystery-light/90 font-detective">Murder Details</h3>
      </div>
      
      {/* No potential killers message */}
      {!hasKillers && (
        <div className="bg-mystery-light/5 rounded border border-mystery-light/10 p-4 text-center">
          <p className="text-mystery-light/60 italic">
            Please define at least one character with the "Potential Killer" role in the Characters tab first.
          </p>
        </div>
      )}
      
      {/* Murder Details Form */}
      {hasKillers && (
        <div className="bg-mystery-light/5 rounded border border-mystery-light/10 p-4">
          <div className="mb-4">
            <label className="block text-mystery-light/80 text-sm mb-1">Real Murderer</label>
            <CharacterSelector
              value={murderDetails.realKiller}
              onChange={(e) => handleChange('realKiller', e.target.value)}
              characters={characterData.slice(0, storyParams?.characterCount || 0).filter((char, idx) => potentialKillers.includes(idx))}
              placeholder="Select the Real Murderer"
            />
            <p className="text-mystery-light/60 text-xs mt-1">
              Choose which of your potential killers actually committed the murder.
            </p>
          </div>
            <div className="mb-4">
            <label className="block text-mystery-light/80 text-sm mb-1">Murder Method</label>
            <MethodSelector
              value={murderDetails.method}
              onChange={(e) => handleChange('method', e.target.value)}
              methods={murderMethods}
              placeholder="Select Murder Method"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-mystery-light/80 text-sm mb-1">Murder Description</label>
            <textarea
              value={murderDetails.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the murder in detail. Include information about the crime scene, how the murder was committed, and any important clues."
              className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent min-h-[150px]"
            />
          </div>
        </div>
      )}
      
      <div className="text-center text-mystery-light/60 text-sm italic mt-2">
        These details will be used to generate the core of your murder mystery story.
      </div>
    </div>
  );
}

export default MurderDetailsTab;
