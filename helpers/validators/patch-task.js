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
    due_date: {
      type: 'string',
      format: 'date-time',
      formatMaximum: '2019-02-10T12:00:00Z',
    	formatExclusiveMaximum: true

    },
    description: {
      type: 'string',
      minLength: 1,
      maxLength: 750
    },
    status: {
        type: 'integer',
        minLength: 1
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
