'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/chat');
    }, 500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-wa-bg transition-colors px-4">
      <div className="w-full max-w-sm bg-wa-panel rounded-2xl shadow-xl border border-wa-border p-8 space-y-6 transition-colors">
        {/* Logo + title */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-wa-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-wa-primary/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-wa-text">Create account</h1>
          <p className="text-sm text-wa-textMuted mt-1">Join and start messaging today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-wa-text mb-1.5">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-[#1e2535] text-wa-text border border-wa-border rounded-xl text-sm focus:outline-none focus:border-wa-primary focus:ring-2 focus:ring-wa-primary/20 transition-all placeholder:text-wa-textMuted"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-wa-text mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-[#1e2535] text-wa-text border border-wa-border rounded-xl text-sm focus:outline-none focus:border-wa-primary focus:ring-2 focus:ring-wa-primary/20 transition-all placeholder:text-wa-textMuted"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-wa-text mb-1.5">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-[#1e2535] text-wa-text border border-wa-border rounded-xl text-sm focus:outline-none focus:border-wa-primary focus:ring-2 focus:ring-wa-primary/20 transition-all placeholder:text-wa-textMuted"
              placeholder="Min. 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-wa-primary hover:bg-wa-primaryDark text-white text-sm font-bold rounded-xl disabled:opacity-50 transition-colors shadow-md shadow-wa-primary/25 active:scale-[0.98]"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-wa-textMuted">
          Already have an account?{' '}
          <Link href="/login" className="text-wa-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
