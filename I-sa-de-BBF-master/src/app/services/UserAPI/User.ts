import { API_BASE_URL_USER, getAuthHeaders } from "../api";
import axios from 'axios';
import { objectToQueryParams } from "../../utils/objectToQueryParams";

// User Services
export const userService = {
  /**
   * Creates a new user.
   * @param {object} userData - User data for creation.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  createUser: async (userData, token) => {
    const url = `${API_BASE_URL_USER}/api/user/create`; // From source: 2
    return await axios.post(url, userData, getAuthHeaders(token)); // From source: 2, 3, 4, 5
  },

  /**
   * Logs in a user.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Promise} Axios promise.
   */
  loginUser: async (email, password, token) => {
    const url = `${API_BASE_URL_USER}/api/user/login`; // From source: 7
    return await axios.post(url, { email, password }, getAuthHeaders(token)); // From source: 8
  },

  /**
   * Verifies a user's login token.
   * @param {string} token - Login token to verify.
   * @returns {Promise} Axios promise.
   */
  verifyLogin: async (token) => {
    const url = `${API_BASE_URL_USER}/api/user/verify-login`; // From source: 10
    return await axios.post(url, { token }, getAuthHeaders(token)); // From source: 11
  },

  /**
   * Retrieves a list of all users.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  getUsers: async (token, order) => {
    const url = `${API_BASE_URL_USER}/api/user`; // From source: 13
    return await axios.get(url, getAuthHeaders(token, order)); // From source: 13, 14
  },

  /**
   * Retrieves a user by their ID.
   * @param {number} id - The ID of the user to retrieve.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  getUserById: async (id, token) => {
    const url = `${API_BASE_URL_USER}/api/user/${id}`; // From source: 15
    return await axios.get(url, getAuthHeaders(token)); // From source: 15, 16
  },

  /**
   * Retrieves a user by query parameters (e.g., email).
   * @param {number} id - User ID (from the URL path).
   * @param {object} params - Query parameters (e.g., { email: "user@example.com" }).
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */

  getUserByQuery: async (query, token, order) => {
    const url = `${API_BASE_URL_USER}/api/user${objectToQueryParams(query)}`; // From source: 41
    return await axios.get(url, getAuthHeaders(token, order)); // From source: 41, 42
  },

  getUserByIdAndQuery: async (query, id, token) => {
    const url = `${API_BASE_URL_USER}/api/user/${id}${objectToQueryParams(query)}`; // From source: 41
    return await axios.get(url, getAuthHeaders(token)); // From source: 41, 42
  },

  /**
   * Updates an existing user's information.
   * @param {number} id - The ID of the user to update.
   * @param {object} userData - Updated user data.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  updateUser: async (id, userData, token) => {
    const url = `${API_BASE_URL_USER}/api/user/${id}`; // From source: 18
    return await axios.put(url, userData, getAuthHeaders(token)); // From source: 18, 19
  },

  /**
   * Deletes a user by their ID.
   * @param {number} id - The ID of the user to delete.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  deleteUser: async (id, token) => {
    const url = `${API_BASE_URL_USER}/api/user/${id}`; // From source: 21
    return await axios.delete(url, getAuthHeaders(token)); // From source: 21, 22
  },

  /**
   * Sends a password reset code to the user's email.
   * @param {string} email - User's email.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  sendResetPasswordCode: async (email, token) => {
    const url = `${API_BASE_URL_USER}/api/user/password/send-code`; // From source: 23
    return await axios.post(url, { email }, getAuthHeaders(token)); // From source: 24
  },

  /**
   * Verifies the password reset code.
   * @param {string} email - User's email.
   * @param {string} otpCode - One-time password code.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  verifyResetCode: async (email, otpCode, token) => {
    const url = `${API_BASE_URL_USER}/api/user/password/verify-code`; // From source: 26
    return await axios.post(url, { email, otpCode }, getAuthHeaders(token)); // From source: 27
  },

  /**
   * Resets the user's password.
   * @param {string} email - User's email.
   * @param {string} password - New password.
   * @param {string} repeatPassword - Repeat new password.
   * @param {string} otpCode - One-time password code.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  resetPassword: async (email, password, repeatPassword, otpCode, token) => {
    const url = `${API_BASE_URL_USER}/api/user/password/reset`; // From source: 29
    return await axios.post(url, { email, password, repeatPassword, otpCode }, getAuthHeaders(token)); // From source: 30
  },
};