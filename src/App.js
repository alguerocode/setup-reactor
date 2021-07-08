import React, { useCallback,useState } from 'react';


const App = () => {
  const [counter, setCounter] = useState(0);
  const increment = useCallback(()=>setCounter(counter++),counter)
  const decrement = useCallback(()=>setCounter(counter--),counter)
  return ( 
    <div className="app">
      <h1>welcome to webpack react!</h1>
      <h2>{counter}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
   );
}
 
export default App;