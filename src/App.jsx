import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import Landing from './pages/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route element={<Landing/>} path='/'/>
      <Route element={<Chat/>} path='/chat'/>
    </Routes>
    
  )
}

export default App
