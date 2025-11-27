import dotenv from "dotenv";
dotenv.config();

// A validação de existência é feita no startup do server (app.ts), 
// então aqui podemos confiar que elas existem ou são strings vazias se algo passar.
export const API_BASE_URL_USER = process.env.APP_URL_USER!;
export const API_BASE_URL_TELECONSULTA = process.env.APP_URL_TELECONSULTA!;
export const API_BASE_URL_MARKETPLACE = process.env.APP_URL_MARKETPLACE!;
export const API_BASE_URL_SOCIAL_MIDIA = process.env.APP_URL_SOCIAL_MIDIA!;

export const getAuthHeaders = (token: string, order: any = null) => {
  const headers: any = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  if (order) {
    headers['order'] = order;
  }

  return { headers };
};

export const getMultipartAuthHeaders = (token: string) => {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  };
};