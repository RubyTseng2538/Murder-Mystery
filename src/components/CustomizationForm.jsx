import React from 'react';

function CustomizationForm({ storyParams, setStoryParams, onGenerate, isGenerating }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoryParams(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-mystery-light/90 mb-2">Setting</label>
        <input
          type="text"
          name="setting"
          placeholder="Manor house, cruise ship, etc."
          value={storyParams.setting}
          onChange={handleChange}
          className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent"
        />
      </div>
      
      <div>
        <label className="block text-mystery-light/90 mb-2">Time Period</label>
        <select
          name="era"
          value={storyParams.era}
          onChange={handleChange}
          className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent"
        >
          <option value="victorian">Victorian Era</option>
          <option value="1920s">1920s</option>
          <option value="1950s">1950s</option>
          <option value="modern">Modern Day</option>
          <option value="future">Future</option>
        </select>
      </div>
      
      <div>
        <label className="block text-mystery-light/90 mb-2">Number of Characters</label>
        <input
          type="range"
          name="characterCount"
          min="3"
          max="8"
          value={storyParams.characterCount}
          onChange={handleChange}
          className="w-full accent-mystery-accent"
        />
        <div className="text-center text-mystery-light/80">{storyParams.characterCount}</div>
      </div>
      
      <div>
        <label className="block text-mystery-light/90 mb-2">Murder Method (optional)</label>
        <input
          type="text"
          name="murderMethod"
          placeholder="Poison, stabbing, etc. (leave blank for random)"
          value={storyParams.murderMethod}
          onChange={handleChange}
          className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent"
        />
      </div>
      
      <div>
        <label className="block text-mystery-light/90 mb-2">Complexity</label>
        <select
          name="complexity"
          value={storyParams.complexity}
          onChange={handleChange}
          className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent"
        >
          <option value="simple">Simple</option>
          <option value="medium">Medium</option>
          <option value="complex">Complex</option>
        </select>
      </div>
      
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full mt-6 py-3 px-4 bg-mystery-accent hover:bg-mystery-accent/90 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Crafting Mystery...' : 'Generate Mystery'}
      </button>
    </form>
  );
}

export default CustomizationForm;