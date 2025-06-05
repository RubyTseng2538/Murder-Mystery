import React from 'react';
import MysteryGenerator from './components/MysteryGenerator.jsx';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mystery-dark to-mystery-dark/90 text-mystery-light p-4">
      <header className="container mx-auto py-6 text-center">
        <h1 className="text-4xl md:text-5xl font-detective font-bold text-mystery-light mb-2">
          Murder Mystery <span className="text-mystery-accent">Script Generator</span>
        </h1>
        <p className="text-xl text-mystery-light/80">Create a unique whodunnit with AI assistance</p>
      </header>
      <main className="container mx-auto py-8">
        <MysteryGenerator />
      </main>
      <footer className="container mx-auto py-4 text-center text-mystery-light/60">
        <p>Developed with React, Tailwind, and a passion for mysteries</p>
      </footer>
    </div>
  );
}

export default App;
