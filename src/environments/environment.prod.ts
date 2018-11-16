export const environment = {
  production: true,
  auth: {
    clientID: 'IQWhWk317NePyCIAUDg6AsC2LuipgoQM',
    domain: 'wimrepo-dashboard.auth0.com', // e.g., you.auth0.com
    audience: 'https://wimrepo-dashboard.auth0.com/api/v2/', // e.g., http://localhost:3001
    redirect: 'https://test.wim.usgs.gov/repos/',
    scope: 'openid profile email'
  }
};
