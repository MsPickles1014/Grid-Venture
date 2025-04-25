// src/App.jsx
import React, { useEffect, useState } from 'react';
import Game from './pages/Game';
import AuthPage from './components/AuthPage'; // NEW styled login/register page

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // Replace with verified user in production
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (!user) {
    return <AuthPage onAuthSuccess={setUser} />;
  }

  return (
    <>
      <div className="flex justify-between p-4 bg-black text-white">
        <p>Logged in</p>
        <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">
          Logout
        </button>
      </div>
      <Game />
    </>
  );
}

export default App;
