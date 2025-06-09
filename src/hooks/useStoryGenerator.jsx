// src/hooks/useStoryGenerator.js
import { useState } from 'react';

function useStoryGenerator() {
  const [story, setStory] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [clues, setClues] = useState([]);
  const [solution, setSolution] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const generateStory = (params) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Generate a well-structured prompt for AI instead of making an API call
      const prompt = createAIPrompt(params);
      
      // Set the prompt for display
      setAiPrompt(prompt);
      
      // Clear any previous story data since we're not showing it anymore
      setStory(null);
      setCharacters([]);
      setClues([]);
      setSolution('');
    } catch (error) {
      console.error('Error generating prompt:', error);
      setError('There was an error generating your prompt. Please try again.');    } finally {
      setIsGenerating(false);
    }
  };

  // Helper function to create the AI prompt
  const createAIPrompt = (params) => {
    const setting = params.setting || 'a mysterious location';
    const era = params.era || 'modern';
    const characterCount = params.characterCount || 5;
    const murderMethod = params.murderDetails?.method || params.murderMethod || 'a method that fits the setting and era';
    const complexity = params.complexity || 'medium';
    const characterNames = params.characterNames || [];
    const characterDetails = params.characterDetails || [];
    const murderDetails = params.murderDetails || {};
    const timeline = params.timeline || {};
      // Format character section if any names or details are provided
    let characterSection = '';    if (characterDetails && characterDetails.some(detail => 
      detail?.name?.trim() !== '' || 
      detail?.personality?.trim() !== '' || 
      detail?.secrets?.trim() !== '' ||
      detail?.motives?.trim() !== '' ||
      detail?.clues?.trim() !== '' ||
      detail?.role?.trim() !== '' ||
      (detail?.relationships && Object.keys(detail?.relationships || {}).length > 0)
    )) {
      characterSection = '\nCHARACTER DETAILS:';
        characterDetails.forEach((detail, index) => {
        if (index < characterCount && (
          detail?.name?.trim() !== '' || 
          detail?.personality?.trim() !== '' || 
          detail?.secrets?.trim() !== '' ||
          detail?.motives?.trim() !== '' ||
          detail?.clues?.trim() !== '' ||
          detail?.role?.trim() !== '' ||
          (detail?.relationships && Object.keys(detail?.relationships || {}).length > 0)
        )) {
          characterSection += `\n- Character ${index + 1}:`;
          if (detail.name?.trim()) characterSection += ` ${detail.name}`;          if (detail.personality?.trim()) characterSection += `\n  Personality: ${detail.personality}`;
          if (detail.secrets?.trim()) characterSection += `\n  Secrets: ${detail.secrets}`;
          if (detail.motives?.trim()) characterSection += `\n  Goals: ${detail.motives}`;
          if (detail.clues?.trim()) characterSection += `\n  Clues: ${detail.clues}`;
            // Format relationships
          if (detail.relationships && Object.keys(detail.relationships).length > 0) {
            characterSection += `\n  Relationships:`;
            Object.entries(detail.relationships).forEach(([targetIdx, relInfo]) => {
              const targetChar = characterDetails[targetIdx];
              const targetName = targetChar?.name?.trim() ? targetChar.name : `Character ${parseInt(targetIdx) + 1}`;
              const relDesc = relInfo.description ? ` - ${relInfo.description}` : '';
              
              characterSection += `\n    - Connected to ${targetName}${relDesc}`;
            });
          }
          
          if (detail.role?.trim()) {
            const roleMapping = {
              'killer': 'Potential Killer',
              'witness': 'Key Witness',
              'redHerring': 'Red Herring',
              'victim': 'Victim'
            };
            characterSection += `\n  Role: ${roleMapping[detail.role] || detail.role}`;
          }
        }
      });
      characterSection += '\n';
    } else if (characterNames && characterNames.some(name => name.trim() !== '')) {
      characterSection = '\nCHARACTER NAMES:';
      characterNames.forEach((name, index) => {
        if (name.trim() !== '' && index < characterCount) {
          characterSection += `\n- ${name}`;
        }
      });
      characterSection += '\n';
    }
    
    // Format murder details section if provided
    let murderDetailsSection = '';
    if (murderDetails && (murderDetails.realKiller || murderDetails.method || murderDetails.description)) {
      murderDetailsSection = '\nMURDER DETAILS:';
      
      if (murderDetails.method) {
        murderDetailsSection += `\n- Method: ${murderDetails.method}`;
      }
      
      if (murderDetails.description) {
        murderDetailsSection += `\n- Description: ${murderDetails.description}`;
      }
      
      if (murderDetails.realKiller && characterDetails[murderDetails.realKiller]) {
        const killer = characterDetails[murderDetails.realKiller];
        const killerName = killer?.name?.trim() ? killer.name : `Character #${parseInt(murderDetails.realKiller) + 1}`;
        murderDetailsSection += `\n- Real Killer: ${killerName}`;
      }
      
      murderDetailsSection += '\n';
    }
    
    // Format timeline section if provided
    let timelineSection = '';
    if (timeline && Object.values(timeline).some(item => item && item.trim() !== '')) {
      timelineSection = '\nTIMELINE OF EVENTS:';
      
      if (timeline.arrival?.trim()) {
        timelineSection += `\n- Arrival: ${timeline.arrival}`;
      }
      
      if (timeline.preEvents?.trim()) {
        timelineSection += `\n- Pre-Murder Events: ${timeline.preEvents}`;
      }
      
      if (timeline.murder?.trim()) {
        timelineSection += `\n- Murder: ${timeline.murder}`;
      }
      
      if (timeline.postEvents?.trim()) {
        timelineSection += `\n- Post-Murder Events: ${timeline.postEvents}`;
      }
      
      if (timeline.discovery?.trim()) {
        timelineSection += `\n- Discovery: ${timeline.discovery}`;
      }
      
      if (timeline.investigation?.trim()) {
        timelineSection += `\n- Investigation: ${timeline.investigation}`;
      }
      
      timelineSection += '\n';
    }
      return `
          ===== MURDER MYSTERY GENERATOR PROMPT =====

          Please create a detailed murder mystery master script with the following parameters:

          SETTING: ${setting}
          TIME PERIOD: ${era}
          NUMBER OF CHARACTERS: ${characterCount}${characterSection}
          MURDER METHOD: ${murderMethod}
          COMPLEXITY: ${complexity}${murderDetailsSection}${timelineSection}          Create a murder mystery where character relationships play a central role in both the plot and the investigation. Relationships should create motives, alibis, and emotional stakes for the characters involved.

          Please provide a comprehensive, novel-like narrative for the entire master script. All sections should be written in engaging, descriptive prose that tells the complete story from beginning to end, with rich descriptions and character development. This narrative should reveal the full sequence of events chronologically, including moments not witnessed by other characters.

          Please structure your response in the following format:

          ## SYNOPSIS
          [Write a compelling synopsis of the murder mystery story, including the setting, time period, and a brief overview of the murder.]          ## CHARACTERS
          [Create ${characterCount} unique characters with names and detailed descriptions. Include their backgrounds, personalities, goals, and relationships to each other and the victim.${characterDetails && characterDetails.some(detail => 
                    detail?.name?.trim() !== '' ||
                    detail?.personality?.trim() !== '' || 
                    detail?.secrets?.trim() !== '' ||
                    detail?.motives?.trim() !== '' ||
                    detail?.clues?.trim() !== '' ||
                    detail?.relationships?.trim() !== '' ||
                    detail?.role?.trim() !== ''
                  ) ? ' Use the provided character details where specified, including any assigned roles (Potential Killer, Key Witness, Red Herring, or Victim).' : characterNames && characterNames.some(name => name.trim() !== '') ? ' Use the provided character names where specified.' : ''}${characterDetails && characterDetails.some(detail => detail?.relationships && Object.keys(detail?.relationships || {}).length > 0) ? '' : ' Create detailed and compelling relationships between all characters, including family ties, friendships, romantic connections, rivalries, and professional relationships as appropriate.'}]          ## CLUES
          [Provide a list of interesting clues that each character would discover during the investigation. The clues should be consistent with the murder method and setting. Include clues that relate to character relationships and how these relationships might create motives or alibis.]          ## SOLUTION
          [Reveal who committed the murder, how they did it, why they did it, and how the clues point to them. Explain how the murderer's relationships with other characters influenced their motives and actions.${timeline && Object.values(timeline).some(item => item && item.trim() !== '') ? ' Ensure the solution is consistent with the provided timeline of events.' : ''}]

          ## FULL STORY TIMELINE
          [Write a comprehensive, long-form narrative that tells the complete story from beginning to end in chronological order. This should be a detailed account covering all events before, during, and after the murder, including character interactions, hidden moments not witnessed by others, and the full sequence of the crime itself. Include rich descriptions, character thoughts, and emotional reactions. This timeline should read like a novel, with engaging prose and dramatic pacing, revealing exactly how events unfolded from every perspective.]
          
          
          The FULL STORY TIMELINE is a CRITICAL component and must be included. It should be a richly detailed narrative that could be read as a standalone murder mystery novel, with a clear beginning, middle, and end. Focus on creating an immersive, atmospheric story that brings the characters and setting to life through descriptive language and thoughtful pacing.

          Make sure the mystery is logically consistent, engaging, and fits the ${complexity} complexity level. All characters should have plausible goals, and the clues should lead to the solution in a satisfying way. Character relationships should be central to the mystery, creating both motives and alibis. The relationships between characters should add depth to the story and provide interesting dynamics during the investigation.

          ## CHARACTER NARRATIVES
          [For each character, create two narrative sections:
          1. A BACKSTORY - Written in first person, detailing their life before these events, their personal history, and how they came to be in this situation.
          2. DAY OF THE MURDER - A detailed account of what they experienced on the day of the murder, written in first person, revealing their thoughts, actions, and emotional responses to the events.]
          
          The CHARACTER NARRATIVES section is also essential and must be included for each character. These narratives should be written in an engaging, first-person style that reveals each character's unique voice, thought processes, and emotional journey. Pay special attention to how their relationships with other characters have shaped their experiences and decisions.
              `.trim();
  };
  
  return {
    story,
    characters,
    clues,
    solution,
    isGenerating,
    error,
    aiPrompt,
    generateStory
  };
}

export default useStoryGenerator;