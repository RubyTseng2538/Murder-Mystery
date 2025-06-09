// CharacterEditor.jsx
import React, { useEffect } from 'react';
import CharacterRoleSelector from './CharacterRoleSelector';

function CharacterEditor({ storyParams, setStoryParams, characterData, setCharacterData }) {
  console.log('CharacterEditor rendered', { characterData, storyParamsDetails: storyParams.characterDetails });
  
  // Ensure character data is properly initialized when the component mounts
  useEffect(() => {
    // If we don't have any character data initialized, create it
    if (!characterData || !characterData.some(char => char)) {
      console.log('Initializing character data');
      const initialData = Array(parseInt(storyParams.characterCount)).fill().map(() => ({
        name: '',
        personality: '',
        secrets: '',
        motives: '',
        clues: '',
        role: '', // Add the role field with empty default value
        relationships: {} // Initialize relationships as an empty object
      }));
      setCharacterData(initialData);
    }
  }, []);
  
  const handleCharacterNameChange = (index, value) => {
    console.log(`Changing name for character ${index} to:`, value);
    
    // Create a new copy of the character data array
    const newCharacterData = [...characterData];
    
    // Ensure we have an object for this index
    if (!newCharacterData[index]) {
      newCharacterData[index] = {
        name: '',
        personality: '',
        secrets: '',
        motives: '',
        clues: '',
        role: '',
        relationships: {}
      };
    }
    
    // Update the name
    newCharacterData[index] = {
      ...newCharacterData[index],
      name: value
    };
    
    // Update the character data state
    setCharacterData(newCharacterData);
    
    // Update storyParams with the new character names and details
    setStoryParams(prev => {
      console.log('Updating storyParams with new character name', {
        index,
        value,
        newCharacterData: newCharacterData[index]
      });
      return {
        ...prev,
        characterNames: newCharacterData.map(char => char?.name || '').slice(0, prev.characterCount),
        characterDetails: newCharacterData.slice(0, prev.characterCount)
      };    });
  };
  
  const handleCharacterDetailChange = (index, field, value) => {
    console.log(`Changing ${field} for character ${index} to:`, value);
    
    // Create a new copy of the character data array
    const newCharacterData = [...characterData];
    
    // Ensure we have an object for this index
    if (!newCharacterData[index]) {
      newCharacterData[index] = {
        name: '',
        personality: '',
        secrets: '',
        motives: '',
        clues: '',
        role: '',
        relationships: {}
      };
    }
    
    // Update the field
    newCharacterData[index] = {
      ...newCharacterData[index],
      [field]: value
    };
    
    // Update the character data state
    setCharacterData(newCharacterData);
    
    // Update storyParams with the new character details
    setStoryParams(prev => {
      console.log('Updating storyParams with new character detail', {
        index,
        field,
        value,
        newCharacterData: newCharacterData[index]
      });
      return {
        ...prev,
        characterDetails: newCharacterData.slice(0, prev.characterCount)
    };    });
  };
  
  // Add handler for character role changes
  const handleRoleChange = (index, value) => {
    console.log(`Changing role for character ${index} to:`, value);
    
    // Create a new copy of the character data array
    const newCharacterData = [...characterData];
    
    // Ensure we have an object for this index
    if (!newCharacterData[index]) {
      newCharacterData[index] = {
        name: '',
        personality: '',
        secrets: '',
        motives: '',
        clues: '',
        role: '',
        relationships: {}
      };
    }
    
    // Update the role
    newCharacterData[index] = {
      ...newCharacterData[index],
      role: value
    };
    
    // Update the character data state
    setCharacterData(newCharacterData);
    
    // Update storyParams with the new character details
    setStoryParams(prev => {
      console.log('Updating storyParams with new character role', {
        index,
        value,
        newCharacterData: newCharacterData[index]
      });      return {
        ...prev,
        characterDetails: newCharacterData.slice(0, prev.characterCount)
      };
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-mystery-light/90 font-detective">Character Details</h3>
        <div className="text-mystery-light/70 text-sm">
          {storyParams.characterCount} characters selected
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto pr-2">
        {Array.from({ length: parseInt(storyParams.characterCount) }).map((_, index) => (
          <div key={`character-${index}`} className="mb-6 p-4 bg-mystery-light/5 rounded border border-mystery-light/10">
            <div className="flex items-center mb-3">
              <span className="text-mystery-light/80 font-detective mr-2">#{index + 1}</span>
              <input
                key={`char-name-${index}`}
                type="text"
                placeholder={`Character ${index + 1} Name`}
                value={(characterData[index]?.name) || ''}
                onChange={(e) => handleCharacterNameChange(index, e.target.value)}
                className="flex-1 p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-mystery-light/80 text-sm mb-1">Personality</label>
                <textarea
                  placeholder="Describe their personality traits..."
                  value={(characterData[index]?.personality) || ''}
                  onChange={(e) => handleCharacterDetailChange(index, 'personality', e.target.value)}
                  className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent text-sm min-h-[60px]"
                />
              </div>
              
              <div>
                <label className="block text-mystery-light/80 text-sm mb-1">Secrets</label>
                <textarea
                  placeholder="What are they hiding?"
                  value={(characterData[index]?.secrets) || ''}
                  onChange={(e) => handleCharacterDetailChange(index, 'secrets', e.target.value)}
                  className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent text-sm min-h-[60px]"
                />
              </div>              <div>
                <label className="block text-mystery-light/80 text-sm mb-1">Goals</label>
                <textarea
                  placeholder="What drives this character?"
                  value={(characterData[index]?.motives) || ''}
                  onChange={(e) => handleCharacterDetailChange(index, 'motives', e.target.value)}
                  className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent text-sm min-h-[60px]"
                />
              </div>
              <div>
                <label className="block text-mystery-light/80 text-sm mb-1">Clues</label>
                <textarea
                  placeholder="What clues are associated with this character?"
                  value={(characterData[index]?.clues) || ''}
                  onChange={(e) => handleCharacterDetailChange(index, 'clues', e.target.value)}
                  className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent text-sm min-h-[60px]"
                />              </div>
              
              <div>
                <label className="block text-mystery-light/80 text-sm mb-1">Character Role</label>
                <CharacterRoleSelector 
                  value={(characterData[index]?.role) || ''}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center text-mystery-light/60 text-sm italic mt-2">
        All fields are optional. Leave blank for AI to generate details.
      </div>
    </div>
  );
}

export default CharacterEditor;
