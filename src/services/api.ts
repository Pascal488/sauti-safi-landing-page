import axios from 'axios';

// Create an axios instance for Strapi API
const strapiAPI = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if it exists
strapiAPI.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_STRAPI_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Generic GET request function
export const fetchData = async <T>(endpoint: string, params = {}): Promise<T> => {
  try {
    const response = await strapiAPI.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Strapi:', error);
    throw error;
  }
};

// Hero section data
export const getHeroContent = async () => {
  return fetchData('/hero');
};

// Features data
export const getFeatures = async () => {
  return fetchData('/features', { populate: '*' });
};

// Benefits data
export const getBenefits = async () => {
  return fetchData('/benefits', { populate: '*' });
};

// Timeline data
export const getTimeline = async () => {
  return fetchData('/timeline-items', { populate: '*' });
};

// Generic post request function
export const postData = async <T>(endpoint: string, data = {}): Promise<T> => {
  try {
    const response = await strapiAPI.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data to Strapi:', error);
    throw error;
  }
};

// Contact form submission
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  message: string;
}) => {
  return postData('/contact-submissions', { data: formData });
};