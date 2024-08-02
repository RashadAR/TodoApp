import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

function ThemeToggle({ darkMode, setDarkMode }) {
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1 rounded-full bg-gray-200 dark:bg-gray-700"
        >
            {darkMode ? (
                <FaSun className="h-6 w-6 text-yellow-400" />
            ) : (
                <FaMoon className="h-6 w-6 text-gray-700" />
            )}
        </button>
    );
}

export default ThemeToggle;
