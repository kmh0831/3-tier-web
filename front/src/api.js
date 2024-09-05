import axios from 'axios';

const API_URL = 'http://your-ec2-public-ip';  // 백엔드 EC2 퍼블릭 IP 주소로 변경

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/movies/search`, { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const signup = async (userInfo) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userInfo);
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    return null;
  }
};
