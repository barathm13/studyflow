import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Button from '../UI/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { supabase } from '../../supabase/client.js';

export default function AuthCard() {
  const { continueAsGuest, isConfigured } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!isConfigured) {
      setMessage('Supabase is not configured yet. Continue as guest or add your Vercel environment variables.');
      return;
    }
    setBusy(true);
    setMessage('');
    const { error } = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    setBusy(false);
    if (error) setMessage(error.message);
    else setMessage(mode === 'login' ? 'Welcome back.' : 'Account created. Check your email if confirmation is enabled.');
  };

  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-200/80">Modern focus ritual</p>
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Flow into deep work with ambience, rhythm, and clarity.</h1>
        <p className="mt-5 max-w-2xl text-lg text-white/65">Sign in to sync analytics with Supabase, or start instantly in guest mode with local progress tracking.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={continueAsGuest}>Continue as guest</Button>
          <Button variant="ghost" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>{mode === 'login' ? 'Create account' : 'I have an account'}</Button>
        </div>
      </div>
      <form onSubmit={submit} className="glass-panel rounded-[2rem] p-6 sm:p-8">
        <h2 className="text-2xl font-bold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        <p className="mt-2 text-sm text-white/55">Persistent sessions are powered by Supabase Auth.</p>
        <div className="mt-6 space-y-4">
          <input className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition focus:border-purple-300" placeholder="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <input className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition focus:border-purple-300" placeholder="Password" type="password" minLength="6" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <Button className="w-full" disabled={busy}>{busy ? <Loader2 className="mx-auto animate-spin" /> : mode === 'login' ? 'Log in' : 'Sign up'}</Button>
        </div>
        {message && <p className="mt-4 rounded-2xl bg-white/10 p-3 text-sm text-white/70">{message}</p>}
      </form>
    </motion.section>
  );
}
