
import api from "./api";

export interface Todo {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  images: {
    id: number;
    imageName: string;
  }[];
}

interface TodoResponse {
  data: Todo[];
  errors: string[];
  statusCode: number;
}

export const getTodos = async (query = ""): Promise<Todo[]> => {
  const response = await api.get<TodoResponse>("/api/to-dos", {
    params: {
      query,
    },
  });

  return response.data.data;
};
