import { API_BASE_URL_USER, getMultipartAuthHeaders } from "../api";
import axios from 'axios';

export const uploadService = {
  /**
   * Uploads files to the server.
   * @param {FormData} formData - FormData object containing the files.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  uploadFiles: async (formData, token) => {
    const url = `${API_BASE_URL_USER}/upload-files`; // From source: 49
    return await axios.post(url, formData, getMultipartAuthHeaders(token)); // From source: 50, 51
  },
};
