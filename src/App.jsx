import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Entry from './components/Entry.jsx';
import SignUp from './components/SignUp.jsx';
import LogIn from './components/LogIn.jsx';
import Home from './pages/Home.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import TrackOrder from './pages/TrackOrder.jsx';
import Admin from './pages/Admin.jsx';
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) setIsLoggedIn(true);
  }, []);

  return (
    <Router>
      <div className="app">
        {isLoggedIn && (
          <nav className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/place-order">Place Order</Link>
            <Link to="/track-order">Track Order</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        )}

        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
