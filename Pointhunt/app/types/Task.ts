// app/types/Task.ts
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

export interface TaskSubmission {
  id: string;
  taskId: string;
  teamId: string;
  //Ingen aning hur data för videon ska vara
  submittedAt: Date;
  status: "pending" | "approved" | "declined";
}