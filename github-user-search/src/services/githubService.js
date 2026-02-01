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
 * Fetches full user data from the GitHub API by username.
 * @param {string} username - The GitHub username to look up
 * @returns {Promise} - Resolves with user data (includes location, public_repos, etc.)
 */
export function fetchUserData(username) {
  return api.get(`/users/${username}`);
}

/**
 * Advanced search: finds users by query with optional location and min repos.
 * Uses GitHub Search API: https://api.github.com/search/users?q={query}
 * @param {Object} params
 * @param {string} [params.query] - Username or search term
 * @param {string} [params.location] - Filter by location (e.g. "Berlin")
 * @param {number} [params.minRepos] - Minimum number of public repos
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.perPage=10] - Results per page (max 100)
 * @returns {Promise} - Resolves with { data: { total_count, items }, ... }
 */
export function searchUsersAdvanced({ query = '', location = '', minRepos = '', page = 1, perPage = 10 }) {
  const parts = ['type:user'];
  if (query.trim()) parts.push(query.trim());
  if (location.trim()) parts.push(`location:${location.trim()}`);
  if (minRepos !== '' && minRepos != null) parts.push(`repos:>${Number(minRepos) || 0}`);
  const q = parts.join(' ');
  return api.get('/search/users', {
    params: { q, page, per_page: perPage },
  });
}

export default { fetchUserData, searchUsersAdvanced };
