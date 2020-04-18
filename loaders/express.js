const bodyParser = require('body-parser');
const cors = require('cors');

const containerRouter = require('./../api/routes/Container.route');
const metadataRouter = require('./../api/routes/Metadata.route');
const homeRouter = require('./../api/routes/Home.route');

// const entryPage = require('./../entryPage.html');

/**
 * Definition of express and all middlewares
 * example: routes, cors, modules, express settings
 */
const expressLoader = async ({ app }) => {
  app.get('/', (req, res) => res.redirect('/home'));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.use(containerRouter);
  app.use(metadataRouter);
  app.use(homeRouter);



  return app;
};

module.exports = expressLoader;