# Mongo Mini
Topics:
  * Databases - OKAY √
  * MongoDB - OKAY √
  * ORMs - OKAY √
  * Mongoose - OKAY √
  * Create/Read/Update/Delete operations - OKAY √

## Description
You'll write a server that lets you create and read Bears through MongoDB. Much
of the knowledge from Node and Express will carry over to this mini project,
where you'll interface with a database in your route handlers. - OKAY √

## Running the Project
- Install [MongoDB](https://www.mongodb.com/download-center). - OKAY √
  - mongodb-osx-x86_64-3.4.7 ...hmm, gonna use homebrew instead
  ```console
  $  brew install mongodb --with-openssl
      Warning: mongodb: this formula has no --with-openssl option so it will be ignored!
      ==> Downloading https://homebrew.bintray.com/bottles/mongodb-3.4.7.sierra.bottle.tar.gz
      ######################################################################## 100.0%
      ==> Pouring mongodb-3.4.7.sierra.bottle.tar.gz
      ==> Caveats
      To have launchd start mongodb now and restart at login:
        brew services start mongodb
      Or, if you don't want/need a background service you can just run:
        mongod --config /usr/local/etc/mongod.conf
      ==> Summary
      🍺  /usr/local/Cellar/mongodb/3.4.7: 18 files, 266.9MB
  ```

- `cd` into your project directory. - DONE √
- Run `npm install` to download the dependencies.  - DONE √
  ```console
  $  npm i
      npm WARN eslint-config-airbnb@14.1.0 requires a peer of eslint-plugin-jsx-a11y@^3.0.2 || ^4.0.0 but none was installed.
      npm WARN eslint-config-airbnb@14.1.0 requires a peer of eslint-plugin-react@^6.9.0 but none was installed.
      npm WARN ls-mongodb-mini@1.0.0 No repository field.

      added 296 packages in 24.409s
  ```

- Run `mongod --dbpath data` and keep it running in a separate terminal. - DONE √
- Write your implementation, as per the instructions below. - OKAY √
- To test your application at any point, run `npm start` to start the server.
  Then, you can make requests to `http://localhost:3000` in Postman or in your
  browser! To make POST requests, you'll need to use Postman. Craft the
  correct requests to test your implementation! - OKAY √

## Instructions
### Schema
Create a schema for the Bears collection. A schema is a description of the
format of documents within a collection. In this case, each Bear is a document
of the form:

```js
{
  species: "American Black Bear",
  latinName: "Ursus americanus",
  createdAt: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)
}
```

In `models.js`, write the schema for the Bears collection. Make the field
`createdAt` default to the current date.

### `POST /bears`
When the client makes a `POST` request to `/bears`:

- Ensure the client passes `species` and `latinName` parameters in the request
  body. If there's an error, respond with an appropriate status code, and send
  a JSON response of the form `{ error: "Some useful error message" }`.

- Create and save a new Bear document. If there's an error while saving, send
  that error as a JSON response, and set the status code to
  `STATUS_SERVER_ERROR` (Internal Server Error).

- Otherwise, if everything is successful, send the Bear document as a JSON
  response.

### `GET /bears`
When the client makes a `GET` request to `/bears`, read all the Bear documents
from MongoDB as an array. Send that array as a JSON response to the client.

If there's an error in retrieving the documents, send that error to the client
in a JSON response. Set the status code to `STATUS_SERVER_ERROR` (Internal
Server Error), as the server couldn't fetch the documents for some reason.

### `GET /bears/:id`
When the client makes a `GET` request to `/bears/:id` (remember, `:id` is a
parameter embedded in the URL, not in the query-string):

- Find the Bear document associated with the given `id`. If there's an error,
  send that error as a JSON response, and set the status code to
  `STATUS_SERVER_ERROR` (Internal Server Error).

- Otherwise, if everything is successful, send the Bear document as a JSON
  response.
