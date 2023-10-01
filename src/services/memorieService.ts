import api from './api';
import { Memory } from '../models/Memory';

export const getMemories = async (): Promise<Memory[]> => {
  const response = await api.get('/memories');
  return response.data.memories;
};

export const getMemory = async (id: number): Promise<Memory> => {
  const response = await api.get(`/memories/${id}`);
  return response.data.memory;
};

export const createMemory = async (memory: Omit<Memory, 'id'>): Promise<void> => {
  await api.post('/memories', memory);
};

export const updateMemory = async (id: number, memory: Omit<Memory, 'id'>): Promise<void> => {
  await api.put(`/memories/${id}`, memory);
};

export const deleteMemory = async (id: number): Promise<void> => {
  await api.delete(`/memories/${id}`);
};

