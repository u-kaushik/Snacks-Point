import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setShowModal(true);
    }
  };

  const handleModalOk = () => {
    setShowModal(false);
    if (email === 'admin@gmail.com') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 relative">
        <div className="absolute top-4 left-4 flex space-x-4">
          <button 
            onClick={() => navigate('/')} 
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Dev Bypass: Menu
          </button>
          <button 
            onClick={() => navigate('/admin')} 
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Dev Bypass: Admin
          </button>
        </div>
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Login</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back!</h2>
          <p className="text-gray-500 mb-8">
            Enter your email address and password to access admin panel.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="admin@gmail.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('');
                  setPassword('');
                }}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 relative bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop&q=80"
          alt="Food"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">This beautiful theme yours!</h3>
          <p className="text-lg italic mb-4 max-w-md">
            "Best investment i made for a long time. Can only recommend it for other users."
          </p>
          <p className="font-semibold">- Admin User</p>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-[#1e1e1e] text-white rounded-lg p-6 w-80 shadow-xl">
            <p className="mb-6 text-sm">This page says<br/>successfully login!</p>
            <div className="flex justify-end">
              <button
                onClick={handleModalOk}
                className="px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
