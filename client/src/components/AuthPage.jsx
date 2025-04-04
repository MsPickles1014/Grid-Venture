import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function AuthPage({ onAuthSuccess }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex items-center justify-center text-white font-sans">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          🌍 Welcome to Grid-Venture
        </h1>

        {showLogin ? (
          <>
            <Login onAuthSuccess={onAuthSuccess} />
            <p className="mt-4 text-center text-sm">
              Don’t have an account?{' '}
              <button
                onClick={() => setShowLogin(false)}
                className="text-blue-400 hover:text-blue-200 transition"
              >
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <Register onAuthSuccess={onAuthSuccess} />
            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <button
                onClick={() => setShowLogin(true)}
                className="text-green-400 hover:text-green-200 transition"
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
