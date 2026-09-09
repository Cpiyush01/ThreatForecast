import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ForecastProvider } from './context/ForecastContext';
import { MonitoringProvider } from './context/MonitoringContext';
import AppLayout from './components/layout/AppLayout';
import CommandCenterPage from './pages/CommandCenterPage';
import LiveMonitorPage from './pages/LiveMonitorPage';
import IntelligencePage from './pages/IntelligencePage';

function AppContent() {
  const { activePage } = useApp();

  return (
    <AppLayout>
      {activePage === 'command-center' || activePage === 'dashboard' ? (
        <CommandCenterPage />
      ) : activePage === 'live-monitor' ? (
        <LiveMonitorPage />
      ) : activePage === 'intelligence' ? (
        <IntelligencePage />
      ) : (
        <CommandCenterPage />
      )}
    </AppLayout>
  );
}

export function App() {
  return (
    <AppProvider>
      <ForecastProvider>
        <MonitoringProvider>
          <AppContent />
        </MonitoringProvider>
      </ForecastProvider>
    </AppProvider>
  );
}

export default App;