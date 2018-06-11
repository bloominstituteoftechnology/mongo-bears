###What is a database?
* collection of data LOL
* organized
* it's searchable - easy to get info from it.
###What is a query? 
asking questions about our data or executing commands to update, create data

###DBMS (Database Management System)

Software that provides a way to store/retrieve data.

Client < = > API < = > DB Server
front-end< = > back-end
* We write code at the client level, the API level and the DB Server level

There are different types of DB Servers - relational and non-relational database. We will bother with relational DB in the CS portion of the course

NoSQL (Not Only SQL) : a type of database
* key-value pair database
* graph 
* document (this is the one that we will work with)

MongoDB is one of the vendors that create document databases.

DB => NoSQL => Document DB => MongoDB

###What does a document database mean?

```js
const user = {
    username: 'admin',
    password: 'secret'
}
```
a document database will have a server

MongoDB Server
- multiple databases(i.e. lambda)
    * collections(i.e. users, roles, products) // resources
        * documents(i.e. { _id: 'adfadfadfadg', username: 'admin' })
            * fields: _id, username

data-modeling - modeling data in your system to indicate how it will be stored

###Why MongoDB?
* popular
* mature
* JS end to end
* synamic schemas (shae of the data [properties and data types])

cons
* dynamic schemas - whenever you want to change something you'll have to check for both properties even though you are referring to the same information.
* 

DBAAS - database as a service (stores data for you)
- MongoDB Atlas
- mlab
    * offer free 500mb tiers
    * we prefer local so you don't have to connect to a service on a cloud

###Mongoose
Client < JSON > [ API (driver) ] < BSON > [ DB Server ]
driver translates whatever you have to BSON for you. BSON is Binary Script Object Notation. We will never use it directly. 

* Mongoose sits on top of the native MongoDB driver
* we get the ability to definie schemas for our data now.
* middleware - 4 types - extends Mongoose
* validation
* ...and more!

Workflow
- connect your API to mongo
- define a schema
- compile the schema into a model
- create a mongoose document by instantiating (calling new) on a model
- use the mongoose document to interact with the actual db document