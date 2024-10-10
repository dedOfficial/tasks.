import { useState, useEffect } from 'preact/hooks';
import { Task } from '@/entities/Task';
import { taskApi } from '@/shared/api/taskApi';
import TaskCreation from '@/features/task-creation/TaskCreation';
import { supabase } from '@/shared/api/supabaseClient';

const TaskPage = ({ userId }: { userId: string }) => {
    const [tasks, setTasks] = useState<Task[] | null>(null);

    // make initial select from tasks table
    useEffect(() => {
        (async () => {
            const fetchedTasks = await taskApi.fetchTasks(userId);
            setTasks(fetchedTasks);
        })();
    }, []);

    // sub to insert tasks to task's table for realtime update
    useEffect(() => {
        const channel = supabase.channel('room1');
        channel
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, payload => {
                setTasks(prev => [...prev, payload.new]);
            })
            .subscribe();

        return () => {
            console.log('unsub');
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div>
            <h1>Your Tasks</h1>
            <TaskCreation userId={userId} />
            <ul>
                {tasks?.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskPage;
