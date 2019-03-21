const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });


const schema = ajv.compile({
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 150
    },
    description: {
      type: 'string',
      minLength: 1,
      maxLength: 750
    },
    content: {
        type: 'string',
        minLength: 1,
        maxLength: 65535
    },
    folder_id: {
        type: 'integer',
        minLength: 1
    }
  },
  additionalProperties: false,
  minProperties: 1
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
