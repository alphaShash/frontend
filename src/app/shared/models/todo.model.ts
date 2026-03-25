export interface Todo {
  id?: number;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  startTime?: string;
  endTime?: string;
}