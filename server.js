const express = require("express");
const { initDb } = require("./data/database");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger/swagger.json");
const errorHandler = require("./middleware/errorHandler");
const { auth } = require("express-openid-connect"); 

require("dotenv").config();

const config = {
  authRequired: false,              
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

const app = express();
app.use(express.json());

app.use(auth(config));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Routes
app.use("/", routes);

// Error handler 
app.use(errorHandler);

const port = process.env.PORT || 3000;

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Swagger: http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });
