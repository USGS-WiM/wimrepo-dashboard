// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// environment.ts
export const environment = {
  production: false,
  auth: {
    clientID: 'IQWhWk317NePyCIAUDg6AsC2LuipgoQM',
    domain: 'wimrepo-dashboard.auth0.com', // e.g., you.auth0.com
    audience: 'https://wimrepo-dashboard.auth0.com/api/v2/', // e.g., http://localhost:3001
    redirect: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  }
};