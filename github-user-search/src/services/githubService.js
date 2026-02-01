import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

const api = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(token && { Authorization: `token ${token}` }),
  },
});

/**
 * Fetches user data from the GitHub API by username.
 * @param {string} username - The GitHub username to look up
 * @returns {Promise} - Resolves with user data, rejects on error (e.g. 404)
 */
export function fetchUserData(username) {
  return api.get(`/users/${username}`);
}

export default { fetchUserData };
