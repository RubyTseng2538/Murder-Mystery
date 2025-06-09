// CharacterRelationshipsTab.jsx
import React, { useState, useEffect } from 'react';
import CharacterSelector from './CharacterSelector';

function CharacterRelationshipsTab({ characterData, setCharacterData, storyParams, setStoryParams }) {
  console.log('CharacterRelationshipsTab rendered', { 
    characterData, 
    characterCount: storyParams?.characterCount,
    availableCharacters: characterData?.slice(0, storyParams?.characterCount || 0)
  });  // State to track relationships between characters
  const [relationships, setRelationships] = useState([]);
  const [newRelationship, setNewRelationship] = useState({
    from: '',
    to: '',
    description: ''
  });  // Default color for relationships
  const relationshipColor = 'bg-mystery-accent';

  // Initialize relationships from character data
  useEffect(() => {
    // If character data has relationships field, extract them
    const existingRelationships = [];    characterData.forEach((char, fromIndex) => {
      if (char && char.relationships && typeof char.relationships === 'object') {
        Object.entries(char.relationships).forEach(([toIndex, rel]) => {
          existingRelationships.push({
            from: fromIndex.toString(),
            to: toIndex,
            description: rel.description || ''
          });
        });
      }
    });
      if (existingRelationships.length > 0) {
      setRelationships(existingRelationships);
    }
  }, [characterData, storyParams]);

  // Update character data when relationships change
  useEffect(() => {
    if (relationships.length === 0) return;
    
    const newCharacterData = [...characterData];
    
    // Reset all relationship data first
    newCharacterData.forEach(char => {
      if (char) {
        char.relationships = {};
      }
    });
    
    // Update with new relationships
    relationships.forEach(rel => {
      const fromIdx = parseInt(rel.from);
      const toIdx = parseInt(rel.to);
      
      if (!newCharacterData[fromIdx]) {
        newCharacterData[fromIdx] = { name: '', personality: '', secrets: '', motives: '', role: '', relationships: {} };
      } else if (!newCharacterData[fromIdx].relationships) {
        newCharacterData[fromIdx].relationships = {};
      }
        // Update the relationship in the character data
      newCharacterData[fromIdx].relationships[toIdx] = {
        description: rel.description
      };
    });
    
    // Update character data and story params
    setCharacterData(newCharacterData);
    setStoryParams(prev => ({
      ...prev,
      characterDetails: newCharacterData.slice(0, prev.characterCount)
    }));
  }, [relationships]);

  // Handle adding a new relationship
  const handleAddRelationship = () => {
    if (newRelationship.from === newRelationship.to) return;
    
    // Check if relationship already exists
    const exists = relationships.some(
      rel => rel.from === newRelationship.from && rel.to === newRelationship.to
    );
    
    if (exists) {
      // Update existing relationship
      setRelationships(relationships.map(rel => 
        rel.from === newRelationship.from && rel.to === newRelationship.to 
          ? { ...newRelationship } 
          : rel
      ));
    } else {
      // Add new relationship
      setRelationships([...relationships, { ...newRelationship }]);
    }
      // Reset form
    setNewRelationship({
      from: '',
      to: '',
      description: ''
    });
  };

  // Handle removing a relationship
  const handleRemoveRelationship = (index) => {
    const newRelationships = [...relationships];
    newRelationships.splice(index, 1);
    setRelationships(newRelationships);
  };  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-mystery-light/90 font-detective">Character Relationships</h3>
      </div>
      
      {/* No characters message */}
      {(!characterData || characterData.length === 0 || storyParams.characterCount <= 0) && (
        <div className="bg-mystery-light/5 rounded border border-mystery-light/10 p-4 text-center">
          <p className="text-mystery-light/60 italic">Please define at least one character in the Characters tab first.</p>
        </div>
      )}
      
      {/* Add New Relationship Form */}
      {characterData && characterData.length > 0 && storyParams.characterCount > 0 && (
        <>
          <div className="bg-mystery-light/5 rounded border border-mystery-light/10 p-4">
            <h4 className="text-mystery-light/80 font-detective mb-3">Add New Relationship</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">              <div>
                <label className="block text-mystery-light/80 text-sm mb-1">From Character</label>
                <CharacterSelector
                  value={newRelationship.from}
                  onChange={(e) => setNewRelationship({...newRelationship, from: e.target.value})}
                  characters={(characterData || []).slice(0, storyParams?.characterCount || 0)}
                  placeholder="Select Character"
                />
              </div>
              
              <div>
                <label className="block text-mystery-light/80 text-sm mb-1">To Character</label>
                <CharacterSelector
                  value={newRelationship.to}
                  onChange={(e) => setNewRelationship({...newRelationship, to: e.target.value})}
                  characters={(characterData || []).slice(0, storyParams?.characterCount || 0)}
                  placeholder="Select Character"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-mystery-light/80 text-sm mb-1">Relationship Description</label>
              <input 
                type="text"
                value={newRelationship.description}
                onChange={(e) => setNewRelationship({...newRelationship, description: e.target.value})}
                placeholder="Describe the relationship (e.g., 'Childhood friends', 'Business partners', 'Siblings', 'Rivals')"
                className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent"
              />
            </div>
            
            <button
              type="button"
              onClick={handleAddRelationship}
              disabled={!newRelationship.from || !newRelationship.to}
              className="w-full py-2 px-4 bg-mystery-accent/80 hover:bg-mystery-accent text-white font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Relationship
            </button>
          </div>
          
          {/* Relationship List */}
          <div className="bg-mystery-light/5 rounded border border-mystery-light/10 p-4 max-h-96 overflow-y-auto">
            <h4 className="text-mystery-light/80 font-detective mb-3">Defined Relationships</h4>
            
            {relationships.length === 0 ? (
              <p className="text-mystery-light/60 text-center italic py-4">No relationships defined yet.</p>
            ) : (
              <div className="space-y-3">
                {relationships.map((rel, index) => {
                  const fromChar = characterData[rel.from];
                  const toChar = characterData[rel.to];
                  
                  return (                    <div key={index} className="flex items-center justify-between p-3 border border-mystery-light/20 rounded bg-mystery-light/5">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center">
                          <span className="font-medium">
                            {fromChar?.name || `Character #${parseInt(rel.from) + 1}`}
                          </span>
                          <span className="text-mystery-light/60 mx-2">→</span>
                          <span className="font-medium">
                            {toChar?.name || `Character #${parseInt(rel.to) + 1}`}
                          </span>
                        </div>
                        {rel.description && (
                          <div className="text-sm text-mystery-light/60 ml-4 mt-1">
                            {rel.description}
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => handleRemoveRelationship(index)}
                        className="ml-2 text-mystery-light/40 hover:text-mystery-light/80"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
      
      <div className="text-center text-mystery-light/60 text-sm italic mt-2">
        Define relationships between characters using descriptive text to enhance your mystery.
      </div>
    </div>
  );
}

export default CharacterRelationshipsTab;