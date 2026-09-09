import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import BackgroundEffects from './BackgroundEffects';
import { useApp } from '../../context/AppContext';
import { useForecast } from '../../hooks/useForecast';

export const AppLayout = ({ children }) => {
  const { sidebarOpen } = useApp();
  const { err, setErr } = useForecast();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Visual background layers */}
      <BackgroundEffects />

      {/* Top Fixed Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main
        className={`
          flex-1 transition-all duration-300 ease-in-out pt-20 pb-12 px-4 sm:px-6 lg:px-8
          ${sidebarOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        <div className="max-w-[1720px] mx-auto space-y-6">
          {/* Global Alert Notification */}
          <AnimatePresence>
            {err && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 shadow-lg shadow-rose-500/10 font-mono text-xs"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  <span>{err}</span>
                </div>
                <button
                  onClick={() => setErr('')}
                  className="p-1 hover:bg-rose-500/20 rounded text-rose-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Render Active View */}
          {children}
        </div>
      </main>

      {/* Futuristic Command Center Status Footer */}
      <footer
        className={`
          py-3 px-6 text-center text-xs font-mono text-slate-600 border-t border-slate-900/80
          transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        <span>PREVENT-X THREATFORECAST ENGINE · TEMPORAL ATTACK HORIZON FORECASTING (+10s TO +60s) · OPERATIONAL THRESHOLD 0.05</span>
      </footer>
    </div>
  );
};

export default AppLayout;
