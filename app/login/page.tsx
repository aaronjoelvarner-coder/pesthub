'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [error, setError] = useState('');
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const res = await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false
    });
    if (res?.error) setError('Invalid credentials');
    else window.location.href = '/';
  }

  return (
    <form className="card max-w-sm space-y-3" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Login</h1>
      <input name="email" className="border rounded p-2 w-full" placeholder="email" />
      <input name="password" type="password" className="border rounded p-2 w-full" placeholder="password" />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button className="btn w-full">Sign in</button>
    </form>
  );
}
