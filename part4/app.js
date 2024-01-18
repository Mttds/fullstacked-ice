const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

/* middlewares */
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger);

/* routes */
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

/* middlewares that must be defined after route handling */
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
