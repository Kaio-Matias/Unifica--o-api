import version from 'project-version';

const doc = {
  info: {
    version,
    title: 'api-users',
    description: '',
  },
  host: 'localhost:80',
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
    deleteProductResponse: {
      message: 'Produto deletado com sucesso',
    },
    productUpdateResponse: {
      message: 'Produto atualizado com sucesso',
    },
    productSetResponse: {
      message: 'Produto criado com sucesso',
    },
    responseGetProducts: {
      result: [
        {
          id: 2,
          produto: 'string',
          quantidade: 9,
          preço: 'R$ 50,000.98',
          categoria: 'categoria',
          created_at: '2024-09-19T06:02:28.065Z',
          updated_at: '2024-09-19T06:00:54.913Z',
        },
        {
          id: 3,
          produto: 'string',
          quantidade: 9,
          preço: 'R$ 50,000.98',
          categoria: 'categoria1',
          created_at: '2024-09-19T06:02:28.065Z',
          updated_at: '2024-09-19T06:02:28.065Z',
        },
      ],
    },
    updateProduct: {
      produto: 'produto1',
      quantidade: 10,
      categoria: 'categoria1',
      preço: 'R$ 50,000.98',
    },
    error400CreateProduct: {
      message: 'Produto já existe',
    },
    error404UpdateProduct: {
      message: 'Produto não encontrado',
    },
    error404GetProduct: {
      message: 'Nenhum produto foi encontrado',
    },
    error404DeleteProduct: {
      message: 'Produto não encontrado',
    },
  },
};

module.exports = doc;
