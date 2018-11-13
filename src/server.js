// server.js
'use strict';

const express = require('express');
const app = express();
// Import the required dependencies
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// We are going to implement a JWT middleware that will ensure the validity of our token. We'll require each protected route to have a valid access_token sent in the Authorization header
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://wimrepo-dashboard.auth0.com.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: '{https://wimrepo-dashboard.auth0.com/api/v2/',
    issuer: "wimrepo-dashboard.auth0.com", // e.g., you.auth0.com
    algorithms: ['RS256']
});

app.get('/api/deals/public', (req, res)=>{
  let deals = [
    // Array of public deals
  ];
  res.json(deals);
})

// For the private route, we'll add this authCheck middleware
app.get('/api/deals/private', authCheck, (req,res)=>{
  let deals = [
    // Array of private deals
  ];
  res.json(deals);
})

app.listen(4200);
console.log('Listening on localhost:4200');