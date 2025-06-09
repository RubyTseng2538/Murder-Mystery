// TimelineTab.jsx
import React, { useState, useEffect } from 'react';

function TimelineTab({ storyParams, setStoryParams }) {
  const [timeline, setTimeline] = useState({
    arrival: '',
    preEvents: '',
    murder: '',
    postEvents: '',
    discovery: '',
    investigation: ''
  });

  // Load timeline from story params if it exists
  useEffect(() => {
    if (storyParams.timeline) {
      setTimeline(storyParams.timeline);
    }
  }, [storyParams.timeline]);

  // Update timeline in story params
  const handleChange = (field, value) => {
    const updatedTimeline = { ...timeline, [field]: value };
    setTimeline(updatedTimeline);
    
    // Update story params
    setStoryParams(prev => ({
      ...prev,
      timeline: updatedTimeline
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-mystery-light/90 font-detective">Timeline of Events</h3>
      </div>
      
      <div className="bg-mystery-light/5 rounded border border-mystery-light/10 p-4">
        <p className="text-mystery-light/80 mb-4">
          Create a timeline of key events to structure your mystery. This will help establish the sequence 
          of events and create a more coherent story.
        </p>
        
        {/* Timeline items */}
        <div className="space-y-6">
          {/* Arrival */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-mystery-accent flex items-center justify-center text-white font-bold">1</div>
              <h4 className="text-mystery-light/90 font-detective ml-2">Arrival</h4>
            </div>
            <div className="ml-8">
              <textarea
                value={timeline.arrival}
                onChange={(e) => handleChange('arrival', e.target.value)}
                placeholder="Describe how and when characters arrive at the scene. Who arrives first? What is the setting like upon arrival?"
                className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent min-h-[80px]"
              />
            </div>
            <div className="absolute left-3 top-10 bottom-0 w-0.5 bg-mystery-light/20"></div>
          </div>
          
          {/* Pre-Murder Events */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-mystery-accent flex items-center justify-center text-white font-bold">2</div>
              <h4 className="text-mystery-light/90 font-detective ml-2">Pre-Murder Events</h4>
            </div>
            <div className="ml-8">
              <textarea
                value={timeline.preEvents}
                onChange={(e) => handleChange('preEvents', e.target.value)}
                placeholder="List key events that happen before the murder. Include interactions, conflicts, or suspicious activities."
                className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent min-h-[80px]"
              />
            </div>
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-mystery-light/20"></div>
          </div>
          
          {/* Murder */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">3</div>
              <h4 className="text-mystery-light/90 font-detective ml-2">Murder</h4>
            </div>
            <div className="ml-8">
              <textarea
                value={timeline.murder}
                onChange={(e) => handleChange('murder', e.target.value)}
                placeholder="Describe when and how the murder occurs. What is the time of death? Where exactly does it happen? Note: you don't need to reveal the killer here."
                className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent min-h-[80px]"
              />
            </div>
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-mystery-light/20"></div>
          </div>
          
          {/* Post-Murder Events */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-mystery-accent flex items-center justify-center text-white font-bold">4</div>
              <h4 className="text-mystery-light/90 font-detective ml-2">Post-Murder Events</h4>
            </div>
            <div className="ml-8">
              <textarea
                value={timeline.postEvents}
                onChange={(e) => handleChange('postEvents', e.target.value)}
                placeholder="Describe what happens after the murder but before discovery. Include any cover-up attempts, alibi creation, or characters moving around."
                className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent min-h-[80px]"
              />
            </div>
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-mystery-light/20"></div>
          </div>
          
          {/* Discovery */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">5</div>
              <h4 className="text-mystery-light/90 font-detective ml-2">Discovery</h4>
            </div>
            <div className="ml-8">
              <textarea
                value={timeline.discovery}
                onChange={(e) => handleChange('discovery', e.target.value)}
                placeholder="Who discovers the body/crime? How does everyone react? What is the initial response?"
                className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent min-h-[80px]"
              />
            </div>
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-mystery-light/20"></div>
          </div>
          
          {/* Investigation */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">6</div>
              <h4 className="text-mystery-light/90 font-detective ml-2">Investigation</h4>
            </div>
            <div className="ml-8">
              <textarea
                value={timeline.investigation}
                onChange={(e) => handleChange('investigation', e.target.value)}
                placeholder="Outline the key points of the investigation. When are clues discovered? How do suspects behave during questioning?"
                className="w-full p-2 rounded bg-mystery-light/10 border border-mystery-light/20 text-mystery-light focus:ring-1 focus:ring-mystery-accent min-h-[80px]"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-mystery-light/60 text-sm italic mt-2">
        A well-structured timeline helps create a coherent and engaging mystery narrative.
      </div>
    </div>
  );
}

export default TimelineTab;
