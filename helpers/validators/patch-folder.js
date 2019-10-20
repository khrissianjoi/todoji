const Ajv = require('ajv'); /*schema validation*/
const ajv = new Ajv({ allErrors: true });


const schema = ajv.compile({
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 150
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
