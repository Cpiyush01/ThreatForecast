import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Radio, Cpu, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const { activePage, setActivePage, sidebarOpen, toggleSidebar } = useApp();

  const navItems = [
    {
      id: 'command-center',
      label: 'COMMAND CENTER',
      icon: LayoutDashboard,
      badge: 'MAIN',
      description: 'Overview & 3D Network',
    },
    {
      id: 'live-monitor',
      label: 'LIVE MONITOR',
      icon: Radio,
      badge: 'LIVE',
      description: 'Packets & Ingestion',
    },
    {
      id: 'intelligence',
      label: 'INTELLIGENCE',
      icon: Cpu,
      badge: 'XAI',
      description: 'SHAP & MITRE ATT&CK',
    },
  ];

  return (
    <aside
      className={`
        fixed top-16 bottom-0 left-0 z-30 transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-64' : 'w-20'}
        bg-[#040814]/90 backdrop-blur-2xl border-r border-slate-800/80
        flex flex-col justify-between py-6 px-3 shadow-2xl
      `}
    >
      {/* Navigation list */}
      <div className="space-y-3">
        <div className="px-3 pb-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center justify-between">
          <span>{sidebarOpen ? 'OPERATION MODES' : 'OPS'}</span>
          {sidebarOpen && <span className="text-cyan-400 font-bold">3 MODULES</span>}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePage(item.id)}
              className={`
                w-full flex items-center gap-3.5 px-3.5 py-3.5 rounded-xl text-left
                transition-all duration-200 relative group cursor-pointer
                ${isActive
                  ? 'bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-transparent border border-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }
              `}
            >
              {/* Active neon strip */}
              {isActive && (
                <motion.div
                  layoutId="activeSidebarIndicator"
                  className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-r shadow-[0_0_10px_#00e5ff]"
                />
              )}

              <div
                className={`
                  p-2 rounded-lg transition-colors flex-shrink-0
                  ${isActive ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40' : 'bg-slate-900 text-slate-400 group-hover:text-slate-200'}
                `}
              >
                <Icon className="w-5 h-5" />
              </div>

              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-mono font-bold tracking-wider truncate">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={`
                          text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold
                          ${isActive
                            ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30'
                            : 'bg-slate-800 text-slate-400'
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                    {item.description}
                  </p>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Footer Info & Collapse Toggle */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        {sidebarOpen && (
          <div className="px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>DEFENSE MATRIX</span>
            </div>
            <div className="text-[10px] text-slate-500">
              Auto-Forecasting: <span className="text-emerald-400">ACTIVE</span>
            </div>
            <div className="text-[10px] text-slate-500">
              Operational Threshold: <span className="text-slate-300">0.05</span>
            </div>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 py-2 text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 rounded-lg transition-colors text-xs font-mono"
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[10px] tracking-wider uppercase">COLLAPSE</span>
            </>
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
