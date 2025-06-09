// src/components/ScriptFormat.jsx
import React from 'react';

function ScriptFormat({ story, characters, clues, solution }) {
  // Format the story into scenes
  const scriptContent = `
    MURDER MYSTERY: "${story.title || 'UNTITLED MYSTERY'}"
    
    SYNOPSIS:
    ${story.synopsis}
    
    CHARACTERS:
    ${characters.map(char => `${char.name} - ${char.description}`).join('\n    ')}
    
    SCENE 1: THE SETUP
    
    [Description of the setting and initial situation]
    
    [Characters are introduced and their relationships established]
    
    SCENE 2: THE MURDER
    
    [The victim is discovered]
    
    [Initial reactions and suspicions]
    
    SCENE 3: THE INVESTIGATION
    
    [Detective begins to gather clues]
    
    CLUES DISCOVERED:
    ${clues.map((clue, i) => `- ${clue}`).join('\n    ')}
    
    SCENE 4: INTERROGATIONS
    
    [Characters are questioned and alibis established]
    
    SCENE 5: THE REVELATION
    
    [The detective gathers everyone together]
    
    [The solution is revealed]
    
    SOLUTION:
    ${solution}
  `.trim();
  
  const downloadScript = () => {
    const element = document.createElement('a');
    const file = new Blob([scriptContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "murder_mystery_script.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <div>
      <pre className="p-4 bg-mystery-paper/70 text-mystery-dark font-script text-sm h-96 overflow-y-auto whitespace-pre-wrap rounded">
        {scriptContent}
      </pre>
      <button 
        onClick={downloadScript}
        className="mt-4 py-2 px-4 bg-mystery-accent text-white rounded hover:bg-mystery-accent/90"
      >
        Download Script
      </button>
    </div>
  );
}

export default ScriptFormat;