Before running, install dependencies using

`npm install`

For local development, you should also set up a MySQL server locally and create a user with a password.
Supply these details as environment variables, you can use `nodemon.json` like so:
```json
{
  "env": {
    "DB_HOST": "localhost",
    "DB_USER": "root",
    "DB_PASSWORD": "rootuserpassword",
    "DB_NAME": "todoji"
  }
}
```
Don't forget to run models/migrations.sql before starting the server for the first time

To run, use either

`node server.js`

or, for live reloads,

`npm start`
