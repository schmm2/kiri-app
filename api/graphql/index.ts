import { ApolloServer } from "apollo-server-azure-functions";
const graphqlSchema = require('./schemas/index');
const mongoose = require('mongoose');
const mongodbConnectionString = "mongodb://kiri-database-dev:SROaS8VyaeHotu5p3RvY9CtQqzheuf8GNlZ6fn5hJbCgZyeMWME5PsgPzXbCAzIz2Kia9jq71NQjuYnj7Yqdyg%3D%3D@kiri-database-dev.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@kiri-database-dev@"

const BASIC_LOGGING = {
  requestDidStart(requestContext) {
      console.log("request started");
      console.log(requestContext.request.query);
      console.log(requestContext.request.variables);
      return {
          didEncounterErrors(requestContext) {
              console.log("an error happened in response to query " + requestContext.request.query);
              console.log(requestContext.errors);
          }
      };
  },

  willSendResponse(requestContext) {
      console.log("response sent", requestContext.response);
  }
};

// connect db
mongoose.connect(mongodbConnectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("database connected");
});

const server = new ApolloServer({
  schema: graphqlSchema,
  plugins: [BASIC_LOGGING]
});

export default server.createHandler();