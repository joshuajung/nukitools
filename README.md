# nukitools

This is a collection of helpful scripts for Nuki Web.

## API Permissions
To use these scripts, you need a Nuki Web API token, which can be generated at https://web.nuki.io/de/#/admin/web-api. Required permissions are:
* View and edit devices
* Operate devices
* View and manage authorizations

## Merge Users
This script merges orphan authorizations in Nuki Web back to their respective users, based on name alone.
1. `yarn install`
2. Set the API token into the `API_KEY` env variable and run `yarn run merge`.

## Sync Locks
This script triggers a sync command for all locks (you can confirm one by one).
1. `yarn install`
2. Set the API token into the `API_KEY` env variable and run `yarn run syncAll`.

## Import Users
This script bulk imports user from a JSON file.
1. `yarn install`
2. Put a file named `users.json` into the root directory, including an array of objects with `fullName` and `email` properties.
3. Set the API token into the `API_KEY` env variable and run `yarn run import`.

## Find Users With Remote Authorizations
This script shows all users that have authorizations to lock/unlock at least one lock remotely.
1. `yarn install`
3. Set the API token into the `API_KEY` env variable and run `yarn run findRemote`.
