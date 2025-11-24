import version from 'project-version';

const doc = {
  info: {
    version,
    title: 'API de Teleconsulta',
    description: '',
  },
  host: 'localhost:8084',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Default',
      description: 'Endpoints of default endpoints',
    },
  ],
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'auth-token',
      in: 'header',
    },
  },
  definitions: {
    Error400: {
      message: 'Descrição sobre o erro',
    },
    Error406: {
      message: 'Descrição sobre o erro',
    },
    Error403: {
      message: 'Descrição sobre o erro',
    },
    ErrorTokenInvalid: { message: 'Token Invalid || Token not provided' },
    DefaultIndex: {
      version,
    },
  },
};

module.exports = doc;
