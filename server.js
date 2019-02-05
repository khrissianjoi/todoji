/*
  Project entry point
  glues everything together
*/
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const handle_errors = require('./helpers/middleware/handle-errors');

const app = express();

app.use(bodyParser.json());
app.use(routes);
app.use(handle_errors);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));