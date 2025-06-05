import React, { useState } from 'react';
import CustomizationForm from './CustomizationForm';
import StoryOutput from './StoryOutput';
import useStoryGenerator from '../hooks/useStoryGenerator';

function MysteryGenerator() {  const [storyParams, setStoryParams] = useState({
    setting: '',
    era: 'modern',
    characterCount: 5,
    murderMethod: '',
    complexity: 'medium',
  });
  
  const { story, characters, clues, solution, isGenerating, error, generateStory } = useStoryGenerator();
  
  const handleGenerateStory = () => {
    generateStory(storyParams);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-mystery-dark/50 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-detective mb-4 text-mystery-accent">Story Parameters</h2>
        <CustomizationForm 
          storyParams={storyParams} 
          setStoryParams={setStoryParams}
          onGenerate={handleGenerateStory}
          isGenerating={isGenerating} 
        />
      </div>
      
      <div className="bg-mystery-paper p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-detective mb-4 text-mystery-dark">Your Mystery</h2>        <StoryOutput 
          story={story}
          characters={characters}
          clues={clues}
          solution={solution}
          isGenerating={isGenerating}
          error={error}
        />
      </div>
    </div>
  );
}

export default MysteryGenerator;