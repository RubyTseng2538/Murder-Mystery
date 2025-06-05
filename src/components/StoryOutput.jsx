import React from 'react';

function StoryOutput({ story, characters, clues, solution, isGenerating, error }) {
  if (isGenerating) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin h-10 w-10 border-4 border-mystery-accent border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-mystery-dark/70 font-script">The mystery is unfolding...</p>
      </div>
    );
  }
    if (error) {
    return (
      <div className="prose prose-sm max-w-none text-mystery-dark font-script">
        <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded text-red-800">
          <p><strong>Error generating mystery:</strong> {error}</p>
          <p className="mt-2">Using mock data instead. You can try again or adjust your parameters.</p>
        </div>
        
        <h3 className="text-xl font-detective">Synopsis</h3>
        <p>{story.synopsis}</p>
        
        <h3 className="text-xl font-detective mt-6">Characters</h3>
        <ul>
          {characters.map((character, index) => (
            <li key={index} className="mb-2">
              <strong>{character.name}</strong> - {character.description}
            </li>
          ))}
        </ul>
        
        <h3 className="text-xl font-detective mt-6">Key Clues</h3>
        <ol>
          {clues.map((clue, index) => (
            <li key={index} className="mb-2">{clue}</li>
          ))}
        </ol>
        
        <div className="mt-8 p-4 border border-dashed border-mystery-dark/30 rounded bg-mystery-light/50">
          <h3 className="text-xl font-detective text-mystery-accent">Solution (Hidden)</h3>
          <details>
            <summary className="cursor-pointer font-bold">Reveal the culprit...</summary>
            <p className="mt-2">{solution}</p>
          </details>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            className="py-2 px-4 bg-mystery-dark text-mystery-light rounded hover:bg-mystery-dark/90 transition-colors"
            onClick={() => {
              const scriptContent = `
MURDER MYSTERY SCRIPT

SYNOPSIS:
${story.synopsis}

CHARACTERS:
${characters.map(char => `${char.name} - ${char.description}`).join('\n')}

CLUES:
${clues.map((clue, i) => `${i+1}. ${clue}`).join('\n')}

SOLUTION:
${solution}
              `;
              
              const element = document.createElement('a');
              const file = new Blob([scriptContent], {type: 'text/plain'});
              element.href = URL.createObjectURL(file);
              element.download = "murder_mystery_script.txt";
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
          >
            Download Script
          </button>
        </div>
      </div>
    );
  }
  
  if (!story) {
    return (
      <div className="text-center py-10 italic text-mystery-dark/70 font-script">
        <p>Your murder mystery will appear here...</p>
        <p className="mt-4">Customize the parameters and generate your unique whodunnit!</p>
      </div>
    );
  }
    return (
    <div className="prose prose-sm max-w-none text-mystery-dark font-script">
      {error && error.includes("quota") && (
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800">
          <p>Note: Using mock data due to OpenAI API quota limits.</p>
        </div>
      )}
      
      <h3 className="text-xl font-detective">Synopsis</h3>
      <p>{story.synopsis}</p>
      
      <h3 className="text-xl font-detective mt-6">Characters</h3>
      <ul>
        {characters.map((character, index) => (
          <li key={index} className="mb-2">
            <strong>{character.name}</strong> - {character.description}
          </li>
        ))}
      </ul>
      
      <h3 className="text-xl font-detective mt-6">Key Clues</h3>
      <ol>
        {clues.map((clue, index) => (
          <li key={index} className="mb-2">{clue}</li>
        ))}
      </ol>
      
      <div className="mt-8 p-4 border border-dashed border-mystery-dark/30 rounded bg-mystery-light/50">
        <h3 className="text-xl font-detective text-mystery-accent">Solution (Hidden)</h3>
        <details>
          <summary className="cursor-pointer font-bold">Reveal the culprit...</summary>
          <p className="mt-2">{solution}</p>
        </details>
      </div>
        <div className="flex justify-end mt-6">
        <button 
          className="py-2 px-4 bg-mystery-dark text-mystery-light rounded hover:bg-mystery-dark/90 transition-colors"
          onClick={() => {
            const scriptContent = `
MURDER MYSTERY SCRIPT

SYNOPSIS:
${story.synopsis}

CHARACTERS:
${characters.map(char => `${char.name} - ${char.description}`).join('\n')}

CLUES:
${clues.map((clue, i) => `${i+1}. ${clue}`).join('\n')}

SOLUTION:
${solution}
            `;
            
            const element = document.createElement('a');
            const file = new Blob([scriptContent], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "murder_mystery_script.txt";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }}
        >
          Download Script
        </button>
      </div>
    </div>
  );
}

export default StoryOutput;