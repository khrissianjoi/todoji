const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const schema = ajv.compile({
  type: 'object',
  required: ['title', 'due_date', 'description', 'status', 'folder_id', 'user_id'],
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
    },
    user_id: {
        type: 'integer',
        minLength: 1
    }
  }
});

module.exports = (obj) => {
  schema(obj);
  return schema.errors ? ajv.errorsText(schema.errors) : '';
};
