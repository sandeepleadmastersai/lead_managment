import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./pages/Login";
import LeadsPage from './pages/LeadsPage'

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);

  return loggedIn ? <LeadsPage /> : <Login onLogin={() => setLoggedIn(true)} />;
}

export default App
