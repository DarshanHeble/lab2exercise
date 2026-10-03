import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to My App</h1>
      <p>This is a simple React frontend connected to my backend.</p>

      <button>Get Data</button>
    </>
  )
}

export default App
