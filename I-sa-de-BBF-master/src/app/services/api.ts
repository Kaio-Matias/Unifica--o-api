
import dotenv from "dotenv";
dotenv.config();

export const API_BASE_URL_USER = process.env.APP_URL_USER!;
export const API_BASE_URL_TELECONSULTA = process.env.APP_URL_TELECONSULTA!;
export const API_BASE_URL_MARKETPLACE = process.env.APP_URL_MARKETPLACE!;
export const API_BASE_URL_SOCIAL_MIDIA = process.env.APP_URL_SOCIAL_MIDIA!;

export const getAuthHeaders = (token: string, order = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    order
  }

  if (!order) {
    delete headers.order
  }

  return {
    headers
  };
};

export const getMultipartAuthHeaders = (token: string) => {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  };
};
