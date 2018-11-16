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
        jwksUri: "https://wimrepo-dashboard.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'http://localhost:4200',
    issuer: "wimrepo-dashboard.auth0.com", // e.g., you.auth0.com
    algorithms: ['RS256']
});

app.get('/', authCheck, (req, res)=>{ //not sure what this is supposed to do
  console.log(req);
  let repos1 = [];
  res.json(repos1);
})

app.listen(4200);
console.log('Listening on localhost:4200');