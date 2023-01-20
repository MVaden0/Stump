import React from 'react';
import './App.css';

import CodeBlock from './components/CodeBlock/CodeBlock';

function App() {
  return (
    <div className="App">
      <div className='codeBlockContainer'>
        <CodeBlock
          content={"interface IProps {}"}
          fileName={'test.tsx'}
        />
      </div>
    </div>
  );
}

export default App;
