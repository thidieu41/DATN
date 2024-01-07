import React from 'react';
import { createClient } from 'src/utils/axios';

const client = createClient();

export const Schedule = {
  Add: async (date: string, quantity: string, reason: string) => {
    const response = await client.post('/app/bookings/', {
      date,
      quantity,
      reason
    });
    return response;
  },

  getAll: async (url: string) => {
    const response = await client.get(url);
    return response;
  },

  getDetails: async (id: string) => {
    const response = await client.get(`/app/bookings/${id}`);
    return response;
  },

  update: async (id: string) => {
    const response = await client.put(`/app/bookings/${id}`);
    return response;
  },

  delete: async (id: string) => {
    const response = await client.delete(`/app/bookings/${id}`);
    return response;
  }
};
