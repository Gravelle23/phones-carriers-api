const { auth, requiresAuth } = require("express-openid-connect");

const config = {
  authRequired: false,          
  auth0Logout: true,            
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

const authRouter = auth(config);

module.exports = { authRouter, requiresAuth };
