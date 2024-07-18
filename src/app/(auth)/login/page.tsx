'use client';
import { login } from '@/services/authService';
import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="bg-gray-900 flex min-h-screen w-full flex-col items-center justify-between p-24">
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="button"
          onClick={() => login(email, password)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
