const bodyParser = require('body-parser');
const cors = require('cors');

const containerRouter = require('./../api/routes/Container.route');
const metadataRouter = require('./../api/routes/Metadata.route');

// const entryPage = require('./../entryPage.html');

/**
 * Definition of express and all middlewares
 * example: routes, cors, modules, express settings
 */
const expressLoader = async ({ app }) => {
  app.get('/', (req, res) => res.send('Hello - METAPOD IS WORKING'));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.use(containerRouter);
  app.use(metadataRouter);



  return app;
};

module.exports = expressLoader;