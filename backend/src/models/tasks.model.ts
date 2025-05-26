export interface Task {
  id: number;
  user_id: number;
  name: string;
  task_date: string;      // Format: 'YYYY-MM-DD'
  from_time: string;      // Format: 'HH:MM:SS'
  until_time: string;     // Format: 'HH:MM:SS'
  description?: string | null;
  created: string;        
  modified: string;       
}