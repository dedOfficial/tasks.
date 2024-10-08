export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'incomplete' | 'complete' | 'in-progress';
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const createTask = (taskData: Partial<Task>): Task => {
  return {
    id: crypto.randomUUID(),
    title: taskData.title || '',
    description: taskData.description || '',
    status: taskData.status || 'incomplete',
    user_id: taskData.user_id || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};
