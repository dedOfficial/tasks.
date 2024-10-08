import { supabase } from './supabaseClient';
import { Task } from '@/entities/Task';

export const taskApi = {
  async fetchTasks(userId: string): Promise<Task[] | null> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching tasks:', error);
      return null;
    }
    return data as Task[];
  },

  async createTask(task: Partial<Task>): Promise<Task | null> {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select();

    if (error) {
      console.error('Error creating task:', error);
      return null;
    }
    return data[0] as Task; // todo: возвращать больше
  },

  async updateTask(taskId: string, updatedFields: Partial<Task>): Promise<Task | null> {
    const { data, error } = await supabase
      .from('tasks')
      .update(updatedFields)
      .eq('id', taskId)
      .single();

    if (error) {
      console.error('Error updating task:', error);
      return null;
    }
    return data as Task;
  },

  async deleteTask(taskId: string): Promise<boolean> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      console.error('Error deleting task:', error);
      return false;
    }
    return true;
  }
};
