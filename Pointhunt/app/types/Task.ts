export interface Task {
  id: string;
  title: string;
  summary: string;
  location: string;
  points: number;
  createdAt: Date;
}

export interface TaskFormData {
  title: string;
  summary: string;
  location: string;
  points: string;
}