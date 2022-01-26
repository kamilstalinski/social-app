import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
