const Ajv = require('ajv'); /*schema validator*/
const ajv = new Ajv({ allErrors: true });


const schema = ajv.compile({
  type: 'object',
  required: ['title', 'description', 'folder_id', 'user_id'],
  properties: {
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 150
    },
    user_id: {
      type: 'integer',
      minimum: 1
    },
    folder_id: {
      type: 'integer',
      minimum: 1
    },
    description: {
      type: 'string',
      minLength: 1,
      maxLength: 750
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
