import TaskCreation from '@/features/task-creation/TaskCreation';
import { PageContainer } from '@ant-design/pro-components';
import TasksList from '@/features/tasks-list/TasksList';

const TaskPage = ({ userId }: { userId: string }) => {
    return (
        <PageContainer
            title={'My tasks'}
            content={
                <div>
                    <TaskCreation userId={userId} />
                    <TasksList userId={userId} />
                </div>
            }
        />
    );
};

export default TaskPage;
