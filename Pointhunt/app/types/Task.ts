export interface Task { // HOST
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