import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AppShell from './components/Layout/AppShell.jsx';
import AmbientBackground from './components/Layout/AmbientBackground.jsx';
import HomePage from './pages/HomePage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import { useSettings } from './context/SettingsContext.jsx';

const pages = { home: HomePage, analytics: AnalyticsPage, settings: SettingsPage };

export default function App() {
  const [page, setPage] = useState('home');
  const { settings } = useSettings();
  const Page = useMemo(() => pages[page] ?? HomePage, [page]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#090713] text-white">
      <AmbientBackground theme={settings.theme} />
      <AppShell currentPage={page} onNavigate={setPage}>
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Page />
        </motion.main>
      </AppShell>
    </div>
  );
}
