# Mongo Mini
Topics:
  * Databases
  * MongoDB
  * ODMs
  * Mongoose
  * Create/Read/Update/Delete operations

## Description
You'll write a server that lets you create and read Bears stored in a MongoDB Database. Much
of the knowledge from Node and Express will carry over to this mini project,
where you'll interface with a database in your route handlers.

## Install MongoDB
* Please head over to the [MongoDB Manual Website](https://docs.mongodb.com/manual/administration/install-community/)  and Install the "Community Edition".
  * To ensure you have Mongo installed properly, run `mongod` (to launch your MongoDB server) in your console. You should be able to connect at that point.
  * With your `mongod` server up and running, open a new terminal window and run `mongo` to see if you can connect with the mongo CLI repl and run the command > `show dbs`. You should get some sort of output here that looks like 
```
 > show dbs
 admin  0.000GB
 local  0.000GB
```
  * This may be difficult to do, please ask for help at this point if you need it.

## Running the Project
* Fork and Clone this project.
* `cd` into your project folder.
* Run `npm install` or `yarn` to download the dependencies.
* Make a folder named `data` to hold your Database files.
* Run `mongod --dbpath data` and keep it running in a separate terminal.
* Add a `server.js` file inside the project folder.
* Write your implementation inside `server.js`, as per the instructions below.
* To start the API server, run `npm start` or `yarn start`.
* Use _Postman_ to test your API.

## Instructions

### Schema and Model
Create a _Schema_ and a _Model_ for the Bears collection. Each _Bear_ Model should conform to the form:

```js
{
  species: "American Black Bear",
  latinName: "Ursus americanus",
  createdAt: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)
}
```

Write the schema for the Bears collection. Make the field
`createdAt` default to the current date.

### `POST /bears`
When the client makes a `POST` request to `/api/bears`:

- Ensure the client passes `species` and `latinName` parameters in the request
  body. If there's an error, respond with an appropriate status code, and send
  a JSON response of the form `{ error: "Some useful error message" }`.

- Create and save a new Bear document. If there's an error while saving, send
  that error as a JSON response, and set the status code to
  `STATUS_SERVER_ERROR` (Internal Server Error).

- Otherwise, if everything is successful, send the Bear document as a JSON
  response. Remember to set the HTTP status code to `201` on the response.

### `GET /bears`
When the client makes a `GET` request to `/api/bears`, read all the Bear documents
from MongoDB as an array. Send that array as a JSON response to the client.

If there's an error in retrieving the documents, send that error to the client
in a JSON response. Set the status code to `STATUS_SERVER_ERROR` (Internal
Server Error), as the server couldn't fetch the documents for some reason.

### `GET /bears/:id`
When the client makes a `GET` request to `/api/bears/:id` (remember, `:id` is a
parameter embedded in the URL, not in the query-string):

- Find the Bear document associated with the given `id`. If there's an error,
  send that error as a JSON response, and set the status code to
  `STATUS_SERVER_ERROR` (Internal Server Error).

- Otherwise, if everything is successful, send the Bear document as a JSON
  response.
