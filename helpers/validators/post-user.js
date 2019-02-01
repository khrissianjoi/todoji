const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/*
  Read up on "JSON Schema" or ajv docs to learn more about these schemas
*/
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
  /*
    Checks if the object passed matches the schema above,
    if errors occur, it returns a string with the errors.
    otherwise, it returns an empty string.
  */
  schema(obj);
  return schema.errors ? ajv.errorsText(schema.errors) : '';
};
