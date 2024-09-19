// api.js
import axios from 'axios';

// 기본 설정
const api = axios.create({
  baseURL: 'http://localhost:8080', // API 기본 경로
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인증 토큰을 요청에 포함
api.interceptors.request.use(
  (config) => {
    // 로그인 요청이 아닌 경우에만 Authorization 헤더 추가
    if (!config.url.startsWith('/users/login')) {
      const token = sessionStorage.getItem('authToken'); // sessionStorage에서 토큰 가져오기
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User API
export const fetchUsers = () => api.get('/users'); // 유저 목록 가져오기
export const fetchUser = (id) => api.get(`/users/${id}`); // 특정 유저 정보 가져오기
export const authenticateUser = (id, password) => api.post('/users/login', { id, password }); // 로그인 

// Compliment API