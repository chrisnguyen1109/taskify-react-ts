import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import './InputField.css';

interface InputFieldProps {
    onCreateTask(task: string, callback: () => void): void;
}

const InputField: React.FC<InputFieldProps> = ({ onCreateTask }) => {
    const [task, setTask] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onCreateTask(task, () => {
            setTask('');
            inputRef.current?.blur();
        });
    };

    return (
        <form className="input" onSubmit={submitFormHandler}>
            <input
                ref={inputRef}
                className="input__box"
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTask(e.target.value)
                }
                required
            />
            <button className="input__submit" type="submit">
                Go
            </button>
        </form>
    );
};

export default InputField;
