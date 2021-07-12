import React from 'react';
import Counter from './components/Counter.jsx';

// implementig lazy loading

const Counter = React.lazy(()=>import('./components/Counter'));

const App = () => {
  return (
    <div className="app">
      <Counter/>
    </div>
  );
};

export default App;
