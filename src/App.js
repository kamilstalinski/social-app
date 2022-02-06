import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp';

function App() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <div className="App">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="signup" element={<SignUp currentUser={currentUser} />} />
        <Route path="login" element={<LogIn currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
      </Routes>
    </div>
  );
}

export default App;
