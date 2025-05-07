const BASE = "http://localhost:3001";

export interface TaskDTO {
  id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high" | "none";
  is_completed: boolean;
}

/* GET all */
export const fetchTasks = async (): Promise<TaskDTO[]> =>
  (await fetch(`${BASE}/tasks`)).json();

/* POST new */
export const createTask = async (body: Omit<TaskDTO, "id" | "is_completed">) =>
  (await fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })).json();

/* PUT toggle */
export const toggleTask = async (id: string) =>
  (await fetch(`${BASE}/tasks/${id}/complete`, { method: "PUT" })).json();

/* DELETE */
export const deleteTask = async (id: string) =>
  fetch(`${BASE}/tasks/${id}`, { method: "DELETE" });
