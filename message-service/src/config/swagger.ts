import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Message Service API',
      version: '1.0.0',
      description: 'Messaging Service for Chat System',
    },
    servers: [
      {
        url: 'http://localhost:5002',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/api/v1/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
