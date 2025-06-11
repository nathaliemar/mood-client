import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
//Interceptor to complete a task before axios request is sent
api.interceptors.request.use(
  async (config) => {
    const json = localStorage.getItem("authToken");

    if (json) {
      config.headers.Authorization = `Bearer ${json}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export { api };
