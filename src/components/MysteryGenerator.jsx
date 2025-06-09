import React, { useState } from 'react';
import CustomizationForm from './CustomizationForm.jsx';
import StoryOutput from './StoryOutput.jsx';
import useStoryGenerator from '../hooks/useStoryGenerator.jsx';

function MysteryGenerator() {  const [storyParams, setStoryParams] = useState({
    setting: '',
    era: 'modern',
    characterCount: 5,
    characterNames: [],
    characterDetails: [],
    murderMethod: '',
    complexity: 'medium',
  });
  
  const { story, characters, clues, solution, isGenerating, error, aiPrompt, generateStory } = useStoryGenerator();
  
  const handleGenerateStory = () => {
    generateStory(storyParams);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-mystery-dark p-6 rounded-lg shadow-xl">
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
          aiPrompt={aiPrompt}
        />
      </div>
    </div>
  );
}

export default MysteryGenerator;