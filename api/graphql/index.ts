import { ApolloServer } from "apollo-server-azure-functions";
var mongoClient = require("mongodb").MongoClient;
const graphqlSchema = require('./schemas/index');
const mongoose = require('mongoose');
const mongodbConnectionString = "mongodb://kiri-database-dev:SROaS8VyaeHotu5p3RvY9CtQqzheuf8GNlZ6fn5hJbCgZyeMWME5PsgPzXbCAzIz2Kia9jq71NQjuYnj7Yqdyg%3D%3D@kiri-database-dev.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@kiri-database-dev@"

// connect db
mongoose.connect(mongodbConnectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("database connected");
});

const server = new ApolloServer({ 
    schema: graphqlSchema 
});
export default server.createHandler();