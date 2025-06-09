import React, { useState } from 'react';

function StoryOutput({ story, characters, clues, solution, isGenerating, error, aiPrompt }) {
  const [copySuccess, setCopySuccess] = useState('');
  
  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(aiPrompt);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopySuccess('Failed to copy');
    }
  };
  if (isGenerating) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin h-10 w-10 border-4 border-mystery-accent border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-mystery-dark/70 font-script">The mystery is unfolding...</p>
      </div>
    );
  }  if (error) {
    return (
      <div className="prose prose-sm max-w-none text-mystery-dark font-script">
        <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded text-red-800">
          <p><strong>Error:</strong> {error}</p>
        </div>
        
        {aiPrompt && (
          <div className="mb-6 p-4 border border-mystery-dark/30 rounded bg-mystery-light/20">
            <h3 className="text-xl font-detective text-mystery-accent">AI Prompt</h3>
            <p className="text-sm mb-2">Copy this prompt and paste it into your preferred AI service (ChatGPT, Claude, etc.)</p>
            <div className="bg-mystery-paper p-3 rounded text-sm font-mono overflow-auto max-h-60 whitespace-pre-wrap">
              {aiPrompt}
            </div>
            <div className="flex justify-end mt-2">
              <button 
                className="py-1 px-3 bg-mystery-accent text-mystery-light rounded hover:bg-mystery-accent/90 transition-colors text-sm"
                onClick={handleCopyPrompt}
              >
                {copySuccess || 'Copy to Clipboard'}
              </button>
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-6 space-x-2">
          <button 
            className="py-2 px-4 bg-mystery-dark text-mystery-light rounded hover:bg-mystery-dark/90 transition-colors"
            onClick={handleCopyPrompt}
          >
            {copySuccess || 'Copy Prompt'}
          </button>
          <button 
            className="py-2 px-4 bg-mystery-dark text-mystery-light rounded hover:bg-mystery-dark/90 transition-colors"
            onClick={() => {
              const element = document.createElement('a');
              const file = new Blob([aiPrompt], {type: 'text/plain'});
              element.href = URL.createObjectURL(file);
              element.download = "murder_mystery_prompt.txt";
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
          >
            Download Prompt
          </button>
        </div>
        
        <p className="mt-2 italic">Please try generating your mystery again or adjust your parameters.</p>
      </div>
    );
  }
  if (!story && !aiPrompt) {
    return (
      <div className="text-center py-10 italic text-mystery-dark/70 font-script">
        <p>Your murder mystery prompt will appear here...</p>
        <p className="mt-4">Customize the parameters and generate your unique whodunnit!</p>
      </div>
    );
  }
    return (
    <div className="prose prose-sm max-w-none text-mystery-dark font-script">
      {error && (
        <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded text-red-800">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
        {aiPrompt && (
        <div className="mb-6 p-4 border border-mystery-dark/30 rounded bg-mystery-light/20">
          <h3 className="text-xl font-detective text-mystery-accent">AI Prompt</h3>
          <p className="text-sm mb-2">Copy this prompt and paste it into your preferred AI service (ChatGPT, Claude, etc.)</p>
          <div className="bg-mystery-paper p-3 rounded text-sm font-mono overflow-auto max-h-60 whitespace-pre-wrap">
            {aiPrompt}
          </div>
          <div className="flex justify-end mt-2">
            <button 
              className="py-1 px-3 bg-mystery-accent text-mystery-light rounded hover:bg-mystery-accent/90 transition-colors text-sm"
              onClick={handleCopyPrompt}
            >
              {copySuccess || 'Copy to Clipboard'}
            </button>
          </div>
        </div>
      )}
      
      <div className="flex justify-end mt-6 space-x-2">
        <button 
          className="py-2 px-4 bg-mystery-dark text-mystery-light rounded hover:bg-mystery-dark/90 transition-colors"
          onClick={handleCopyPrompt}
        >
          {copySuccess || 'Copy Prompt'}
        </button>
        <button 
          className="py-2 px-4 bg-mystery-dark text-mystery-light rounded hover:bg-mystery-dark/90 transition-colors"
          onClick={() => {
            const element = document.createElement('a');
            const file = new Blob([aiPrompt], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "murder_mystery_prompt.txt";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }}
        >
          Download Prompt
        </button>
      </div>
    </div>
  );
}

export default StoryOutput;