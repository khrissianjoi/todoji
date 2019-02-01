const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const schema = ajv.compile({
  type: 'object',
  required: ['name', 'email', 'password'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 150
    },
    email: {
      type: 'string',
      minLength: 1,
      maxLength: 200,
      pattern:
        '^(([^<>()[\\].,;:\\s@"]+(\\.[^<>()[\\].,;:\\s@"]+)*)|(".+"))@' +
        '(([^<>()[\\].,;:\\s@"]+\\.)+[^<>()[\\].,;:\\s@"]{2,})$',
    },
    password: {
      type: 'string',
      minLength: 1
    }
  }
});

module.exports = (obj) => {
  schema(obj);
  return schema.errors ? ajv.errorsText(schema.errors) : '';
};
