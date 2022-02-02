import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import { TodoData } from '../../App';
import './TodoItem.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { GrRevert } from 'react-icons/gr';
import { Draggable } from 'react-beautiful-dnd';

interface TodoItemProps {
    todo: TodoData;
    index: number;
    onToggleTask(id: string): void;
    onDeleteTask(id: string): void;
    onEditTask(taskEdit: TodoData, cb: () => void): void;
}

const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    index,
    onToggleTask,
    onDeleteTask,
    onEditTask,
}) => {
    const { id, task, isCompleted } = todo;
    const [isEdit, setIsEdit] = useState(false);
    const [editTask, setEditTask] = useState(task);
    const editInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        isEdit && editInputRef.current?.focus();
    }, [isEdit]);

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isCompleted) return;

        onEditTask({ id, task: editTask, isCompleted }, () => {
            setIsEdit(false);
        });
    };

    const setIsEditHandler = () => {
        setEditTask(task);
        setIsEdit(!isEdit);
    };

    const taskContent = (): React.ReactNode => {
        if (isEdit) {
            return (
                <input
                    ref={editInputRef}
                    className="todo__single--text"
                    value={editTask}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditTask(e.target.value)
                    }
                    required
                />
            );
        }

        if (isCompleted) {
            return <s className="todo__single--text">{task}</s>;
        } else {
            return <span className="todo__single--text">{task}</span>;
        }
    };

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    onSubmit={submitFormHandler}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`todo__single ${
                        snapshot.isDragging ? 'drag' : ''
                    }`}
                >
                    {taskContent()}

                    <div className="todo__single--icons">
                        {!isCompleted && (
                            <span className="icon" onClick={setIsEditHandler}>
                                <AiFillEdit />
                            </span>
                        )}

                        <span className="icon" onClick={() => onDeleteTask(id)}>
                            <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => onToggleTask(id)}>
                            {isCompleted ? <GrRevert /> : <MdDone />}
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
};

export default TodoItem;
