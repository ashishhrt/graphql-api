require('dotenv').config();

const hapi = require('hapi');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const { makeExecutableSchema } = require('graphql-tools');

const Painting = require('./models/Painting');
const Technique = require('./models/Technique');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

mongoose.connect(process.env.DB_URI);
mongoose.connection.once('open', () => console.log('Connected to database'));

const schema = makeExecutableSchema({
    typeDefs: [graphqlSchema],
    resolvers: [graphqlResolver( { Painting, Technique } )]
});

const server = hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.HOST
});

/* jshint ignore:start */
const init = async () => {
    await server.register({
        plugin: graphqlHapi,
        options: {
          path: '/graphql',
          graphqlOptions: {
            pretty: true,
            schema: schema,
          },
          route: {
            cors: true,
          }
        },
      });
    // add graphiql plugin
    await server.register({
        plugin: graphiqlHapi,
        options: {
          path: '/graphiql',
          graphiqlOptions: {
            endpointURL: '/graphql',
          },
        },
      });
    //add server routes
    /*
    await server.route([
        {
            method: 'GET',
            path: '/',
            handler: (req, res) => `<h1>My modern api</h1>`
        },
        {
            method: 'GET',
            path: '/api/v1/paintings',
            handler: (req, res) => Painting.find()
        },
        {
            method: 'POST',
            path: '/api/v1/paintings',
            handler: (req, res) => {
                const { name, url, techniques } = req.payload;
                const painting = new Painting({
                    name,
                    url,
                    techniques
                });

                return painting.save();
            }
        },
        {
            method: 'GET',
            path: '/graphql',
            handler: (req, res) => {
                console.log(req.query);
                return graphql(schema, req.query.query).then((response) => {
                    console.log(response);
                    return response;
                });
            }
        }
    ]);
    */
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};
/* jshint ignore:end */
try{
    init();
}
catch(error){
    console.log(`Error while starting server: ${err.message}`);
}