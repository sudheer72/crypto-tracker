import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import CryptoTable from './components/CryptoTable';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Check for user preference on first render
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Cryptocurrency Prices</h2>
            <p className="text-gray-600 dark:text-gray-400">The global crypto market cap is $2.39T, a 2.86% increase over the last day.</p>
          </div>
          <CryptoTable />
        </main>
      </div>
    </Provider>
  );
}

export default App;