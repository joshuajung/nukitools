# nukimerge

This script merges orphan authorizations in Nuki Web back to their respective users, based on name alone.

## How to use
1. Create an API token with "Berechtigungen anzeigen und verwalten" permissions on https://web.nuki.io/de/#/admin/web-api
2. Set the token into the `API_KEY` env variable and run `index.ts` with `ts-node`.
