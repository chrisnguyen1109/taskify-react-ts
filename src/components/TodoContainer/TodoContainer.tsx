import React from 'react';
import { TodoData } from '../../App';
import TodoList from '../TodoList/TodoList';
import './TodoContainer.css';

export type TodoListType = 'active' | 'completed';

interface TodoContainerProps {
    todos: TodoData[];
    setTodos: React.Dispatch<React.SetStateAction<TodoData[]>>;
}

const TodoContainer: React.FC<TodoContainerProps> = ({ todos, setTodos }) => {
    const doneTaskHandler = (id: string) => {
        setTodos(prevState => {
            const cloneTodo = [...prevState];

            const selectedTodo = cloneTodo.find(el => el.id === id)!;
            const selectedTodoIndex = cloneTodo.findIndex(el => el.id === id);

            cloneTodo.splice(selectedTodoIndex, 1);

            cloneTodo.splice(0, 0, {
                ...selectedTodo,
                isCompleted: !selectedTodo.isCompleted,
            });

            return cloneTodo;
        });
    };

    const deleteTaskHandler = (id: string) => {
        setTodos(prevState => {
            return prevState.filter(state => state.id !== id);
        });
    };

    const editTaskHandler = (taskEdit: TodoData, callback: () => void) => {
        setTodos(prevState => {
            return prevState.map(state =>
                state.id === taskEdit.id ? taskEdit : state
            );
        });

        callback();
    };

    return (
        <div className="container">
            <TodoList
                type="active"
                todos={todos.filter(el => !el.isCompleted)}
                onToggleTask={doneTaskHandler}
                onDeleteTask={deleteTaskHandler}
                onEditTask={editTaskHandler}
            />
            <TodoList
                type="completed"
                todos={todos.filter(el => el.isCompleted)}
                onToggleTask={doneTaskHandler}
                onDeleteTask={deleteTaskHandler}
                onEditTask={editTaskHandler}
            />
        </div>
    );
};

export default TodoContainer;
