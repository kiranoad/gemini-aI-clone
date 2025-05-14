import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import Main from './components/Main/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='layout'>
      <div className='sidebar'>
        <Sidebar/>
      </div>
      <div className='main'>
        <Main />
      </div>
    </div>
  )
}

export default App
