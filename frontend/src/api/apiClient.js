import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000, // 10 seconds timeout
});

// Response Interceptor for cleaner error handling
apiClient.interceptors.response.use(
  (response) => response.data, // Directly return the data part of the response
  (error) => {
    // You can add global error notifications here (e.g., Toast messages)
    const message = error.response?.data?.message || "Something went wrong with the API";
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

export default apiClient;