// api.js
import axios from 'axios';

// 기본 설정
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // API 기본 경로
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인증 토큰을 요청에 포함
api.interceptors.request.use(
  (config) => {
    // 로그인 요청이 아닌 경우에만 Authorization 헤더 추가
    if (!config.url.startsWith('/api/users/login')) {
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
export const fetchUsers = () => api.get('/api/users'); // 유저 목록 가져오기
export const fetchUser = (id) => api.get(`/api/users/${id}`); // 특정 유저 정보 가져오기
export const authenticateUser = (id, password) => api.post('/api/users/login', { id, password }); // 로그인 
export const fetchCompliments = () => api.get('/api/compliments'); // 칭찬 목록 가져오기
export const signUp = (id, password, name) => api.post('/api/users/sign-up', {id, name, password}); // 회원가입
export const checkId = (id) => api.get(`/api/users/check-id?id=${id}`);

// Compliment API
export const createCompliment = (compliment) => api.post('/api/compliments', compliment);
export const fetchSenderArchievement = () => api.get('/api/achievements/monthly-senders')
export const fetchReceiverArchievement = () => api.get('/api/achievements/monthly-receivers')
