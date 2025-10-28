import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export const getStream = () => axios.get(`${API_BASE}/api/stream`);
export const sendTimeControl = (payload) => axios.post(`${API_BASE}/api/time-control`, payload);
