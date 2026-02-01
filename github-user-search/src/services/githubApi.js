import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(token && { Authorization: `token ${token}` }),
  },
});

/**
 * Search GitHub users (placeholder for future implementation).
 * Use: githubApi.get('/search/users', { params: { q: username } })
 */
export const searchUsers = (query) =>
  githubApi.get('/search/users', { params: { q: query } });

export default githubApi;
