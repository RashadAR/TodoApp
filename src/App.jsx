import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen gradient-bg ${darkMode ? 'dark' : ''} flex flex-col`}>
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Todo App</h1>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <ErrorBoundary>
            <TodoList />
          </ErrorBoundary>
        </div>
      </div>
      <footer className="text-center py-4 text-white bg-black bg-opacity-30">
        Made by Rashad
      </footer>
    </div>
  );
}

export default App;