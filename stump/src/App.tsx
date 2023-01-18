import React from 'react';
import './App.css';

import CodeBlock from './components/CodeBlock';

function App() {
  return (
    <div className="App">
      <div className='codeBlockContainer'>
        <CodeBlock
          text={"adsf"}
          fileName={'test.tsx'}
        />
      </div>
    </div>
  );
}

export default App;
