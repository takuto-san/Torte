export default {
  api: {
    input: './schemas/openapi.json',
    output: {
      mode: 'split',
      target: './api/',
      schemas: './api/schemas',
    },
  },
};