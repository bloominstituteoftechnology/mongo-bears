# Mongo Bears

## Topics:

* Databases
* MongoDB
* ODMs
* Mongoose
* Performing CRUD operations.

## Description

We will use Node.js and Express to write an API that can perform CRUD (Create, Read, Update and Destroy) operations on _Bears_ stored in a MongoDB Database.

### Software Requirements

For this project you need to have _MongoDB Community Edition_ installed and running. Having a local instance of _MongoDB_ running on your system is the preferred option.

Alternatively, you can sign up for an account from a _Database As A Service_ (DBAAS) provider like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [mlab](https://mlab.com/). Both _DBAAS_ providers offer a free tier with 500MB size limit that can be used for development and testing.

#### Using a Local MongoDB Server

If you don't have MongoDB installed, please click on [this link](https://docs.mongodb.com/manual/administration/install-community/) for instructions on how to **install** and **run** the _Community Server_ and the _mongo shell_. Follow the instructions for your _Operating System_.

After MongoDB is installed, follow the instructions on the documentation to start the server. Then run the _mongo shell_ from a separate terminal and execute the `show dbs` command. If all goes well you should see a list of available databases, similar to the sample below.

```
 > show dbs
 admin  0.000GB
 local  0.000GB
```

## Getting the Starter Files

1.  **Fork** and **Clone** this repository.
1.  **CD into the folder** where you cloned the repository.
1.  Type `yarn` or `npm install` to download all dependencies listed inside `package.json`.
1.  After all dependencies finish downloading without errors, type `yarn start` or `npm start` to start the server.

## Use _Postman_ to Test the API.

1.  Make a GET Request to [http://localhost:5000](http://localhost:5000) using _Postman_. The response should be the following JSON object:

```json
{
  "api": "running"
}
```

### Connect API Server to MongoDB

Use _yarn_ or _npm_ to add _mongoose_ to to the project.

Inside `server.js`, require _mongoose_ and use it to connect your API to the `beardb` database in your MongoDB Server (local or remote). If the `beardb` database does not exist, it will be created automatically by MongoDB.

When the connection to MongoDB succeeds, log the following message to the console: _"Successfully Connected to MongoDB"_.

If there is an error connecting to the database, log the following message to the console: _"Database connection failed"_.

### Create Bear Schema

In a separate file, create a _Schema_ for the `bears` collection. Each _Bear_ document should conform to the following object structure:

```js
{
  species: "American Black Bear", // String, required
  latinName: "Ursus americanus",  // String, required
  createdOn: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
}
```

### Generate Bear Model

Use _mongoose_ to generate a `Bear` model that can be used to perform operations on _bear documents_. Remember to export the model to make it available for importing into other parts of the application.

### Create API Endpoints

Configure the API to respond to the following routes:

| Method | Endpoint       | Description                                                                                                                     |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/bears     | Creates a bear using the information sent inside the `request body`.                                                            |
| GET    | /api/bears     | Returns an array of all the bear objects contained in the database.                                                             |
| GET    | /api/bears/:id | Returns the bear object with the specified id.                                                                                  |
| DELETE | /api/bears/:id | Removes the bear with the specified id and returns the deleted bear.                                                            |
| PUT    | /api/bears/:id | Updates the bear with the specified id using data from the `request body`. **Returns the modified document, NOT the original.** |

#### Endpoint Specifications

When the client makes a `POST` request to `/api/bears`:

* If the request body is missing the `species` or `latinName` property:

  * cancel the request.
  * respond with HTTP status code `400` (Bad Request).
  * return the following JSON response: `{ errorMessage: "Please provide both species and latinName for the bear." }`.

* If the information about the _Bear_ is valid:

  * save the new _Bear_ the the database.
  * return HTTP status code `201` (Created).
  * return the **newly created** _Bear Document_.

* If there's an error while saving the _Bear_:
  * cancel the request.
  * respond with HTTP status code `500` (Server Error).
  * return the following JSON object: `{ errorMessage "There was an error while saving the bear to the database" }`.

When the client makes a `GET` request to `/api/bears`:

* If there's an error in retrieving the _Bears_ from the database:
  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ errorMessage "The bear information could not be retrieved." }`.

When the client makes a `GET` request to `/api/bears/:id`:

* If the _Bear_ with the specified `id` is not found:

  * return HTTP status code `404` (Not Found).
  * return the following JSON object: `{ message: "The bear with the specified ID does not exist." }`.

* If there's an error in retrieving the _Bear_ from the database:
  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ errorMessage "The bear information could not be retrieved." }`.

When the client makes a `DELETE` request to `/api/bears/:id`:

* If the _Bear_ with the specified `id` is not found:

  * return HTTP status code `404` (Not Found).
  * return the following JSON object: `{ errorMessage: "The bear with the specified ID does not exist." }`.

* If there's an error in removing the _Bear_ from the database:
  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ errorMessage "The bear could not be removed" }`.

When the client makes a `PUT` request to `/api/bears/:id`:

* If the _Bear_ with the specified `id` is not found:

  * return HTTP status code `404` (Not Found).
  * return the following JSON object: `{ message: "The bear with the specified ID does not exist." }`.

* If there's an error when updating the _Bear_:
  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ errorMessage "The bear information could not be modified." }`.

### Additional Notes

**Stop the MongoDB database server when not in use to save computer resources**.
