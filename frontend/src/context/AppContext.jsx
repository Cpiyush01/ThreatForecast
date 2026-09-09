import React, { createContext, useState, useContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('command-center');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [globalError, setGlobalError] = useState('');

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const clearError = () => setGlobalError('');

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        globalError,
        setGlobalError,
        clearError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
