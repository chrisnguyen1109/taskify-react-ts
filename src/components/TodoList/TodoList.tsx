import React from 'react';
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { TodoData } from '../../App';
import { TodoListType } from '../TodoContainer/TodoContainer';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

interface TodoListProps {
    type: TodoListType;
    todos: TodoData[];
    onToggleTask(id: string): void;
    onDeleteTask(id: string): void;
    onEditTask(taskEdit: TodoData, callback: () => void): void;
}

const TodoList: React.FC<TodoListProps> = ({
    type,
    todos,
    onToggleTask,
    onDeleteTask,
    onEditTask,
}) => {
    const todosClasses = (snapshot: DroppableStateSnapshot) => {
        if (type === 'active') {
            return `todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`;
        } else {
            return `todos ${
                snapshot.isDraggingOver ? 'dragcomplete' : 'remove'
            }`;
        }
    };

    return (
        <Droppable
            droppableId={type === 'active' ? 'TodoActive' : 'TodoCompleted'}
        >
            {(provided, snapshot) => (
                <div
                    className={todosClasses(snapshot)}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <span className="todos__heading">{type} Tasks</span>
                    {todos.map((todo, index) => (
                        <TodoItem
                            todo={todo}
                            key={todo.id}
                            index={index}
                            onToggleTask={onToggleTask}
                            onDeleteTask={onDeleteTask}
                            onEditTask={onEditTask}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default TodoList;
