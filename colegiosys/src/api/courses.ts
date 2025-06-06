import api from './axios';

export const getCourses = async () => {
  const res = await api.get('/courses');
  return res.data;
};

export const getCourse = async (id: number) => {
  const res = await api.get(`/courses/${id}`);
  return res.data;
};

export const createCourse = async (data: { name: string }) => {
  const res = await api.post('/courses', data);
  return res.data;
};

export const updateCourse = async (id: number, data: { name: string }) => {
  const res = await api.patch(`/courses/${id}`, data);
  return res.data;
};

export const deleteCourse = async (id: number) => {
  await api.delete(`/courses/${id}`);
};