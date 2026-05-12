// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.

import { provideStoreDevtools } from '@ngrx/store-devtools';

// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  // If BE is hosted locally (dotnet run) then use http://localhost:5125 or https://localhost:7157.
  endpoint: 'https://academy-ng-in-action-api.azurewebsites.net',
  providers: [provideStoreDevtools({ maxAge: 25, autoPause: true })],
};
