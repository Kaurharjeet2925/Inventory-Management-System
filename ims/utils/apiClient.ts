const API_BASE_URL = 'http://localhost:5000/api';

export const apiClient = {
  register: async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return res.json();
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  getDashboard: async (token: string) => {
    const res = await fetch(`${API_BASE_URL}/dashboard`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  }
};