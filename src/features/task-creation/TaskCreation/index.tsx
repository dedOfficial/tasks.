import { useState } from 'preact/hooks';
import { createTask } from '@/entities/Task';
import { taskApi } from '@/shared/api/taskApi';

const TaskCreation = ({ userId }: { userId: string }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateTask = async () => {
        const task = createTask({ title, description, user_id: userId });
        await taskApi.createTask(task);
        setTitle('');
        setDescription('');
    };

    return (
        <div>
            <h2>Create a new task</h2>
            <input
                type="text"
                value={title}
                onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
                placeholder="Task Title"
            />
            <textarea
                value={description}
                onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
                placeholder="Task Description"
            />
            <button onClick={handleCreateTask}>Create Task</button>
        </div>
    );
};

export default TaskCreation;
