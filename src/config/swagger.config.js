export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Corpdoc API',
      version: '1.0.0',
      description:
        'The API documentation of Corpdoc for RESTful APIs using Node.js, Express, and Postgres.',
      contact: {
        name: 'Phuoc Dat, Nhat Ha',
        url: 'https://github.com/datdat1234',
        email: 'deltora1st@gmail.com',
      },
    },
    basePath: '/api',
    servers: [
      {
        url: 'http://localhost:3001/api/',
      },
    ],
  },
  tags: [
    {
      name: 'User',
      description: 'API for users',
    },
  ],
  apis: [
    'src/models/*.js',
    'src/utils/helpers/*.js',
    'src/api/controllers/user/*.js',
    'src/api/controllers/user/edit/*.js',
    'src/api/controllers/user/auth/*.js',
  ],
};
