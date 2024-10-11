import { createTask } from '@/entities/Task';
import { taskApi } from '@/shared/api/taskApi';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';

const TaskCreation = ({ userId }: { userId: string }) => {
    const handleCreateTask = async (formData: { title: string; description?: string }) => {
        const task = createTask({ ...formData, user_id: userId });
        await taskApi.createTask(task);
        message.success('提交成功');

        return !!formData.title;
    };

    return (
        <ProForm
            className={'mb-2 ml-1'}
            layout={'inline'}
            onFinish={handleCreateTask}
            autoFocusFirstInput
            clearOnDestroy={true}
        >
            <ProFormText
                name={'title'}
                label={'Create new task'}
                required={true}
                placeholder={'Title'}
            />
            <ProFormText name={'description'} placeholder={'Description'} />
        </ProForm>
    );
};

export default TaskCreation;
