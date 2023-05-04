const api_keys = require('./config/env.config');
const path = require('path');
require('express-async-errors');

//* Express Initialization
const express = require('express');
const app = express();
const port = api_keys.PORT || 5000;

//* Security Packages
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

//* Database connector
const connectDB = require('./db/connect');

//* Routes
const routes = require('./routes/routes');
const analyticalRoutes = require('./routes/analyticalRoutes');

//* Swagger API
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocuments = yaml.load('./config/swagger.yaml');

//* Middlewares
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

//* Initializing Middlewares
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Serving Frontend
// app.use(express.static(path.join(__dirname, 'public')))

//* Serving Docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocuments));

//* API Routes
app.use('/byexpertise', routes);
app.use('/analytics', analyticalRoutes)

//* Error Handling middleware
app.use(notFoundMiddleware, errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(api_keys.MONGO_URL).then(() => console.log('Connected to DB..'));
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();