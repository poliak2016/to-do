import { api } from "../lib/api";

export const todosService = {
  getAll: () => api.get('/todos'),
  getById: (id) => api.get(`/todos/${id}`),
  create: (todo) => api.post('/todos', todo),
  update: (id, todo) => api.put(`/todos/${id}`, todo),
  delete: (id) => api.del(`/todos/${id}`),
};
