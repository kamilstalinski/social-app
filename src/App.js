import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  let loggedInfo = localStorage.user;

  useEffect(() => {
    if (loggedInfo) {
      setLoggedIn(true);
    } else if (loggedInfo === undefined) {
      setLoggedIn(false);
    }
  })

  console.log(loggedIn)

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
