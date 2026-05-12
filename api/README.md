# API service

The BE is hosted under azure, see `https://academy-ng-in-action-api.azurewebsites.net`.
If Required (dev process) you can host it locally. See below descriptions.

## To start the service, run within this directory `dotnet run` (hosts as http).

## To see available endpoints, access swagger ui either under `http://localhost:5125/swagger` or for https `https//localhost:7157/swagger`.

## Setting up cosmos db credentials

To connect to cosmos db, either use your own container or ask me to get the key.
They provided key must be set under  [launchSettings.json](./Properties/launchSettings.json).
Note: Do not commit key to git.
To ignore file changes, execute within root dir: `git update-index --assume-unchanged ./api/Properties/launchSettings.json`
