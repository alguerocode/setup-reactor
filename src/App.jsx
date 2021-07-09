import React, {useCallback, useState} from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const decrement = useCallback(() => {
    setCount(count - 1);
  }, [count])
  return (
    <div className="app">
      <h1>welcome to webpack react!</h1>
      <h2>{count}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default App;
