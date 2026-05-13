import { BarChart3, Home, LogOut, Settings, Sparkles } from 'lucide-react';
import Button from '../UI/Button.jsx';
import AuthCard from './AuthCard.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const nav = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AppShell({ currentPage, onNavigate, children }) {
  const { user, guest, loading, signOut } = useAuth();

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
      <header className="glass-panel mb-6 flex items-center justify-between rounded-3xl px-4 py-3">
        <button className="flex items-center gap-3 text-left" onClick={() => onNavigate('home')}>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-purple-700 shadow-glow"><Sparkles size={22} /></span>
          <span><span className="block text-lg font-extrabold tracking-tight">StudyFlow</span><span className="hidden text-xs text-white/55 sm:block">Immersive Pomodoro workspace</span></span>
        </button>
        <nav className="hidden gap-2 md:flex">
          {nav.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => onNavigate(id)} className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${currentPage === id ? 'bg-white text-slate-950' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 sm:inline-flex">{user ? user.email : guest ? 'Guest mode' : 'Not signed in'}</span>
          {(user || guest) && <Button variant="ghost" className="!rounded-xl !px-3 !py-2" onClick={signOut}><LogOut size={17} /></Button>}
        </div>
      </header>

      {!loading && !user && !guest ? <AuthCard /> : <div className="flex-1">{children}</div>}

      <nav className="glass-panel fixed bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-3xl p-2 md:hidden">
        {nav.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => onNavigate(id)} className={`rounded-2xl px-4 py-3 ${currentPage === id ? 'bg-white text-slate-950' : 'text-white/65'}`} aria-label={label}>
            <Icon size={20} />
          </button>
        ))}
      </nav>
    </div>
  );
}
