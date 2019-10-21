const Ajv = require('ajv'); /*schema validator*/
const ajv = new Ajv({ allErrors: true });

const schema = ajv.compile({
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 150
    },
    email : {
      type : 'string',
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
  },
  additionalProperties: false,
  minProperties: 1
});

module.exports = (obj) => {
  schema(obj);
  return schema.errors ? ajv.errorsText(schema.errors) : '';
};
