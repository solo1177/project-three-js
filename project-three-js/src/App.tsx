import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as THREE from "three";

function App() {
  const [count, setCount] = useState(0)

  console.log(THREE);
  
  return (
    <>
      <div>
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
      </div>

      <h1>こんにちは！</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>


    </>
  )
}

export default App
