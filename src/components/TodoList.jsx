import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { FaPlus, FaCheck, FaUndo, FaTrash } from 'react-icons/fa';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const storedTodosString = localStorage.getItem('todos');
            if (storedTodosString) {
                const storedTodos = JSON.parse(storedTodosString).map(todo => ({
                    ...todo,
                    text: DOMPurify.sanitize(todo.text)
                }));
                setTodos(storedTodos);
            }
        } catch (err) {
            console.error('Error loading todos:', err);
            setError('Failed to load todos. Please try clearing your browser data.');
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos));
        } catch (err) {
            console.error('Error saving todos:', err);
            setError('Failed to save todos. Please check your browser settings.');
        }
    }, [todos]);

    const addTodo = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const sanitizedInput = DOMPurify.sanitize(input.trim());
            setTodos(prevTodos => {
                const newTodos = [...prevTodos, { id: Date.now(), text: sanitizedInput, done: false }];
                return newTodos;
            });
            setInput('');
        }
    };

    const deleteTodo = (id) => {
        setTodos(prevTodos => {
            const newTodos = prevTodos.filter(todo => todo.id !== id);
            return newTodos;
        });
    };

    const toggleTodo = (id) => {
        setTodos(prevTodos => {
            const newTodos = prevTodos.map(todo =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            );
            return newTodos;
        });
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center w-full max-w-md">
            <form onSubmit={addTodo} className="mb-8 w-full">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-gray-950 dark:text-gray-200 placeholder-gray-800 dark:placeholder-gray-400"
                        placeholder="Add a new todo..."
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                    >
                        <FaPlus className="h-5 w-5" />
                    </button>
                </div>
            </form>
            <div className="w-full bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id} className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-200 dark:border-gray-700">
                            <span
                                className={`text-gray-900 dark:text-gray-200 ${todo.done ? 'line-through' : ''}`}
                                onClick={() => toggleTodo(todo.id)}
                            >
                                {todo.text}
                            </span>
                            <div className="flex items-center">
                                <button
                                    onClick={() => toggleTodo(todo.id)}
                                    className={`${todo.done ? 'text-yellow-500 hover:text-yellow-700' : 'text-green-500 hover:text-green-700'} mr-2`}
                                >
                                    {todo.done ? <FaUndo className="h-4 w-4" /> : <FaCheck className="h-4 w-4" />}
                                </button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash className="h-4 w-4" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;
