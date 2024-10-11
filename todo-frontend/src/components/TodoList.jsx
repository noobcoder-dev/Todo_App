// src/TodoList.js
import React, { useEffect, useState } from 'react';
import {
    Container, Row, Col, Button, Input, Modal,
    ModalHeader, ModalBody, ModalFooter, FormGroup, Label
} from 'reactstrap';
import axios from 'axios';

const TodoList = ({ username, onLogout }) => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchTodos = async () => {
            const access = localStorage.getItem('access');
            const response = await axios.get('http://127.0.0.1:8000/api/todos/', {
                headers: { Authorization: `Bearer ${access}` },
            });
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        const access = localStorage.getItem('access');
        const response = await axios.post('http://127.0.0.1:8000/api/todos/', {
            title,
            description,
            completed: false,
        }, {
            headers: { Authorization: `Bearer ${access}` },
        });
        setTodos([...todos, response.data]);
        setTitle('');
        setDescription('');
    };

    const handleDeleteTodo = async (id) => {
        const access = localStorage.getItem('access');
        await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`, {
            headers: { Authorization: `Bearer ${access}` },
        });
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleEditTodo = (todo) => {
        setEditingTodo(todo);
        setTitle(todo.title);
        setDescription(todo.description);
        setModalOpen(true);
    };

    const handleUpdateTodo = async () => {
        const access = localStorage.getItem('access');
        const response = await axios.put(`http://127.0.0.1:8000/api/todos/${editingTodo.id}/`, {
            title,
            description,
            completed: editingTodo.completed,
        }, {
            headers: { Authorization: `Bearer ${access}` },
        });

        setTodos(todos.map(todo => (todo.id === editingTodo.id ? response.data : todo)));
        setModalOpen(false);
        setEditingTodo(null);
        setTitle('');
        setDescription('');
    };

    const toggleCompleted = async (todo) => {
        const access = localStorage.getItem('access');
        const updatedTodo = { ...todo, completed: !todo.completed };

        const response = await axios.put(`http://127.0.0.1:8000/api/todos/${todo.id}/`, updatedTodo, {
            headers: { Authorization: `Bearer ${access}` },
        });

        setTodos(todos.map(t => (t.id === todo.id ? response.data : t)));
    };

    return (
        <Container className="todo-container">
            <div className="header">
                <h2>Welcome, {username}!</h2>
                <Button color="danger" className="logout-button" onClick={onLogout}>Logout</Button>
            </div>
            <h3>Todo List</h3>
            <div className="add-todo-form">
                <Input
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    type="text"
                    value={description}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={handleAddTodo}>Add Todo</Button>
            </div>
            <Row className="todo-list">
                {todos.map((todo) => (
                    <Col key={todo.id} md={4} xs={12}>
                        <div className={`todo-card ${todo.completed ? 'completed' : ''}`}>
                            <h4>{todo.title}</h4>
                            <p>{todo.description}</p>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleCompleted(todo)}
                                    />
                                    {' '}Completed
                                </Label>
                            </FormGroup>
                            <Button color="warning" onClick={() => handleEditTodo(todo)}>Edit</Button>
                            <Button color="danger" onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Edit Modal */}
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Edit Todo</ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        type="text"
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdateTodo}>Update Todo</Button>
                    <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default TodoList;
