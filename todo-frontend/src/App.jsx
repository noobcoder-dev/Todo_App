// src/App.js
import React, { useState } from 'react';
import Auth from './components/Auth';
import TodoList from './components/TodoList';

const App = () => {
    const [username, setUsername] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (user) => {
        setUsername(user);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false);
        setUsername('');
    };

    return (
        <div>
            {!isAuthenticated ? (
                <Auth onLogin={handleLogin} />
            ) : (
                <TodoList username={username} onLogout={handleLogout} />
            )}
        </div>
    );
};

export default App;
