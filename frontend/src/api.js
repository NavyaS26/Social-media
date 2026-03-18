import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:8000' });

// Users
export const createUser = (data) => API.post('/users/', data);
export const getAllUsers = () => API.get('/users/');
export const getUser = (id) => API.get(`/users/${id}`);
export const followUser = (data) => API.post('/users/follow', data);
export const unfollowUser = (data) => API.post('/users/unfollow', data);

// Posts
export const createPost = (data) => API.post('/posts/', data);
export const getAllPosts = () => API.get('/posts/');
export const getPostsByHashtag = (tag) => API.get(`/posts/hashtag/${tag}`);
export const addComment = (postId, data) => API.post(`/posts/${postId}/comments`, data);

// Engagement
export const recordEngagement = (postId, data) => API.post(`/engagement/${postId}`, data);
export const getEngagementCounts = (postId) => API.get(`/engagement/${postId}/counts`);

// Analytics
export const getTrending = () => API.get('/analytics/trending');
export const getNetworkStats = (userId) => API.get(`/analytics/network/${userId}`);
export const getUserSummary = (userId) => API.get(`/analytics/user/${userId}/summary`);
export const getHashtagAnalytics = (tag) => API.get(`/analytics/hashtag/${tag}`);