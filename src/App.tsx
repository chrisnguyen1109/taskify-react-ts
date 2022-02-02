import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField/InputField';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TodoContainer from './components/TodoContainer/TodoContainer';
export interface TodoData {
    id: string;
    task: string;
    isCompleted: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<TodoData[]>(() => {
        return (JSON.parse(localStorage.getItem('todos')!) || []) as TodoData[];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const createTaskHandler = (task: string, callback: () => void) => {
        setTodos(prevState => [
            { id: uuidv4(), task, isCompleted: false },
            ...prevState,
        ]);

        callback();
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            return;
        }

        setTodos(prevState => {
            const cloneTodo = [...prevState];

            const selectedTodo = cloneTodo.find(
                el => el.id === result.draggableId
            )!;
            const selectedTodoIndex = cloneTodo.findIndex(
                el => el.id === result.draggableId
            );

            cloneTodo.splice(selectedTodoIndex, 1);

            if (destination.droppableId === 'TodoActive') {
                const destinationTodo = prevState.filter(el => !el.isCompleted)[
                    destination.index
                ];

                const destinationTodoIndex = destinationTodo
                    ? cloneTodo.findIndex(el => el.id === destinationTodo.id)
                    : cloneTodo.length;

                cloneTodo.splice(destinationTodoIndex, 0, {
                    ...selectedTodo,
                    isCompleted: false,
                });

                return cloneTodo;
            } else {
                const destinationTodo = prevState.filter(el => el.isCompleted)[
                    destination.index
                ];

                const destinationTodoIndex = destinationTodo
                    ? cloneTodo.findIndex(el => el.id === destinationTodo.id)
                    : cloneTodo.length;

                cloneTodo.splice(destinationTodoIndex, 0, {
                    ...selectedTodo,
                    isCompleted: true,
                });

                return cloneTodo;
            }
        });
    };

    return (
        <div className="App">
            <span className="heading">Taskify</span>
            <InputField onCreateTask={createTaskHandler} />
            <DragDropContext onDragEnd={onDragEnd}>
                <TodoContainer todos={todos} setTodos={setTodos} />
            </DragDropContext>
        </div>
    );
};

export default App;
