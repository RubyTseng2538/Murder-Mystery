// src/hooks/useStoryGenerator.js
import { useState } from 'react';

function useStoryGenerator() {
  const [story, setStory] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [clues, setClues] = useState([]);
  const [solution, setSolution] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const generateStory = async (params) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Call our backend API
      const response = await fetch('http://localhost:5000/api/generate-mystery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          setting: params.setting,
          era: params.era,
          characterCount: params.characterCount,
          genre: params.genre
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      // If there's an error in the response
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Update state with the generated story
      setStory({ synopsis: data.synopsis });
      setCharacters(data.characters);
      setClues(data.clues);
      setSolution(data.solution);    } catch (error) {
      console.error('Error generating story:', error);
      
      // Create mock data for fallback
      const mockResponse = {
        synopsis: `A mysterious murder takes place in ${params.setting || 'an isolated mansion'} during the ${params.era} era. The victim is found in the study, and it's up to the detective to unravel the web of deceit.`,
        characters: [
          { name: 'Inspector Hamilton', description: 'A sharp-witted detective with a troubled past.' },
          { name: 'Lady Elizabeth', description: 'The wealthy heiress with secrets to protect.' },
          { name: 'Dr. Morgan', description: 'The family physician with questionable ethics.' },
          { name: 'Mr. Jenkins', description: 'The loyal butler who sees everything.' },
          { name: 'Professor Wright', description: 'An academic with a motive for revenge.' },
        ].slice(0, params.characterCount),
        clues: [
          'A torn letter found in the fireplace',
          'Muddy footprints leading to the garden',
          'The victim\'s watch stopped at 11:42 PM',
          'A glass with traces of an unknown substance',
        ],
        solution: 'Professor Wright committed the murder to prevent the victim from publishing research that would have discredited his life\'s work. He used a rare poison that mimicked natural causes, but overlooked the stopped watch which revealed the actual time of death.'
      };
      
      // Check if this is a quota exceeded error
      const isQuotaExceeded = error.message && (
        error.message.includes('quota exceeded') || 
        error.message.includes('insufficient_quota')
      );
      
      if (isQuotaExceeded) {
        // For quota errors, use mock data without showing an error
        setError(null); // Clear any existing error
        setStory({ synopsis: mockResponse.synopsis });
        setCharacters(mockResponse.characters);
        setClues(mockResponse.clues);
        setSolution(mockResponse.solution);
        console.log("Using mock data due to quota limits");
      } else {
        // For other errors, show the error message but also provide mock data
        // so the UI doesn't break
        setError(error.message);
        setStory({ synopsis: mockResponse.synopsis });
        setCharacters(mockResponse.characters);
        setClues(mockResponse.clues);
        setSolution(mockResponse.solution);
      }
    } finally {
      setIsGenerating(false);
    }
  };
    return {
    story,
    characters,
    clues,
    solution,
    isGenerating,
    error,
    generateStory
  };
}

export default useStoryGenerator;