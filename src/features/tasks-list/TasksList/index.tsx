import { FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Task } from '@/entities/Task';
import { taskApi } from '@/shared/api/taskApi.ts';
import { supabase } from '@/shared/api/supabaseClient.ts';
import { Button, Card, Checkbox, List, Spin } from 'antd';
import VirtualList from 'rc-virtual-list';
import { MoreOutlined } from '@ant-design/icons';

const TasksList: FunctionComponent<{ userId: string }> = ({ userId }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

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
            .on('postgres_changes', { event: 'insert', schema: 'public', table: 'tasks' }, (payload) => {
                setTasks((prev) => [...prev, payload.new]);
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    const changeStatus = async (status: Task["status"], task: Task) => {
        setTasks((prev) => [...prev.filter((f) => f.id !== task.id), {...task, status}]);

        const updatedTask = await taskApi.updateTask(task.id, { status })
        console.log('updatedTask', updatedTask);
    };

    return (
        <Card classNames={{ body: '!p-4' }}>
            <Spin spinning={!tasks?.length}>
                <List size={'small'}>
                    <VirtualList
                        loading={'lazy'}
                        data={tasks?.sort(
                            (a, b) =>
                                new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf(),
                        )}
                        height={window.innerHeight - 200}
                        itemHeight={43}
                        itemKey='id'
                        // onScroll={onScroll}
                    >
                        {(item) => {
                            const isComplete = item.status === 'complete';
                            const undef = undefined;

                            return (
                                <List.Item
                                    key={item.id}
                                    className={isComplete ? 'bg-gray-200' : undef}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Checkbox
                                                checked={isComplete}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    if (checked) changeStatus('complete', item);
                                                    else changeStatus('incomplete', item);
                                                }}
                                            />
                                        }
                                        title={
                                            <span
                                                class={
                                                    isComplete
                                                        ? 'line-through text-gray-500'
                                                        : undef
                                                }
                                            >
                                                {item.title}
                                            </span>
                                        }
                                        description={
                                            item.description ? (
                                                <span class={'text-xs ml-0.5'}>
                                                    {item.description}
                                                </span>
                                            ) : undefined
                                        }
                                    />
                                    <Button size={'small'} type={'text'} icon={<MoreOutlined />} />
                                </List.Item>
                            );
                        }}
                    </VirtualList>
                </List>
            </Spin>
        </Card>
    );
};

export default TasksList;
