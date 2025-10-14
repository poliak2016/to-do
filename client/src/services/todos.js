import { api } from "../lib/api";

const base = '/api/todos';

export const todos = {
  list: () => api.get(base),
  // getById: (id) => api.get(`${base}/${id}`),
  create: (text) => api.post(base, { text }),
  toggle: (id, done) => api.patch(`${base}/${id}`, { done }),
  rename: (id, text) => api.patch(`${base}/${id}`, { text }),
  remove: (id) => api.del(`${base}/${id}`),
};
