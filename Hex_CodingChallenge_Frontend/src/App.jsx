import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import PlayerForm from './components/PlayerForm/PlayerForm'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PlayerEditForm from './components/PlayerEditForm/PlayerEditForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Cricket Manager</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Dashboard</Link>
            <Link className="nav-link" to="/add">Add Player</Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<PlayerForm />} />
          <Route path="/edit/:id" element={<PlayerEditForm/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
