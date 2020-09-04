import React from 'react';
import './App.css';

import { Game } from './battle/components/Game';

const App: React.FC = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
};

export default App;
