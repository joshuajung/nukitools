# nukitools

This is a collection of helpful scripts for Nuki Web.

## Merge Users
This script merges orphan authorizations in Nuki Web back to their respective users, based on name alone.
1. `yarn install`
2. Create an API token with "Berechtigungen anzeigen und verwalten" permissions on https://web.nuki.io/de/#/admin/web-api
3. Set the token into the `API_KEY` env variable and run `yarn run merge`.

## Import Users
This script bulk imports user from a JSON file.
1. `yarn install`
2. Create an API token with "Berechtigungen anzeigen und verwalten" permissions on https://web.nuki.io/de/#/admin/web-api
3. Put a file named `users.json` into the root directory, including an array of objects with `fullName` and `email` properties.
3. Set the token into the `API_KEY` env variable and run `yarn run import`.
