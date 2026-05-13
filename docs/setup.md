# Setup Guide

Follow these steps to get the project running locally.

## Prerequisites

- **Node.js:** (LTS version recommended) - Required for the UI.
- **.NET SDK:** - Required for the API.
- **Angular CLI:** `npm install -g @angular/cli`

## UI (Frontend)

1. Navigate to the `ui` directory:

   ```bash
   cd ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   ng serve
   ```

4. Open [http://localhost:4200](http://localhost:4200) in your browser.

## API (Backend)

The backend is hosted on Azure at: `https://academy-ng-in-action-api.azurewebsites.net`.
However, if you want to run it locally:

1. Navigate to the `api` directory:

   ```bash
   cd api
   ```

2. Start the service:

   ```bash
   dotnet run
   ```

3. Access Swagger UI at `http://localhost:5125/swagger`.

### Cosmos DB Credentials

To connect to a local or remote Cosmos DB, update the credentials in `api/Properties/launchSettings.json`.
**Note:** Do not commit keys to Git. Use the following command to ignore local changes to that file:

```bash
git update-index --assume-unchanged ./api/Properties/launchSettings.json
```
