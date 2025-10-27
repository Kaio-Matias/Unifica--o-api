import { API_BASE_URL_USER, getAuthHeaders } from "../api";
import axios from 'axios';
import { objectToQueryParams } from "../../utils/objectToQueryParams";

// Contact Services
export const contactService = {
  /**
   * Creates a new contact.
   * @param {object} contactData - Contact data for creation.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  createContact: async (contactData, token) => {
    const url = `${API_BASE_URL_USER}/contact/create`; // From source: 36
    return await axios.post(url, contactData, getAuthHeaders(token)); // From source: 37
  },

  /**
   * Retrieves a list of all contacts.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  getContacts: async (token, order) => {
    const url = `${API_BASE_URL_USER}/contact`; // From source: 39
    return await axios.get(url, getAuthHeaders(token, order)); // From source: 39, 40
  },

  /**
   * Retrieves a contact by their ID.
   * @param {number} id - The ID of the contact to retrieve.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  getContactById: async (id, token) => {
    const url = `${API_BASE_URL_USER}/contact/${id}`; // From source: 41
    return await axios.get(url, getAuthHeaders(token)); // From source: 41, 42
  },

  getContactByQuery: async (query, token, order) => {
    const url = `${API_BASE_URL_USER}/contact${objectToQueryParams(query)}`; // From source: 41
    return await axios.get(url, getAuthHeaders(token, order)); // From source: 41, 42
  },

  getContactByIdAndQuery: async (query, id, token) => {
    const url = `${API_BASE_URL_USER}/contact/${id}${objectToQueryParams(query)}`; // From source: 41
    return await axios.get(url, getAuthHeaders(token)); // From source: 41, 42
  },

  /**
   * Updates an existing contact's information.
   * @param {number} id - The ID of the contact to update.
   * @param {object} contactData - Updated contact data.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  updateContact: async (id, contactData, token) => {
    const url = `${API_BASE_URL_USER}/contact/${id}`; // From source: 44
    return await axios.put(url, contactData, getAuthHeaders(token)); // From source: 45
  },

  /**
   * Deletes a contact by their ID.
   * @param {number} id - The ID of the contact to delete.
   * @param {string} token - Authentication token.
   * @returns {Promise} Axios promise.
   */
  deleteContact: async (id, token) => {
    const url = `${API_BASE_URL_USER}/contact/${id}`; // From source: 47
    return await axios.delete(url, getAuthHeaders(token)); // From source: 47, 48
  },
};
