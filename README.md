# SDC Sample Repo

This repo contains examples of gathering metrics about your application's performance and can be helpful while working through SDC.

## Included Examples

### Bulk Inserting Data into Postgres

In `server/bulk-insert.js`, there is an example of a script for bulk-inserting large amounts of data into a postgres database in an efficient way. It works by writing large amounts of data to a file and bulk-loading that file into the database using the `COPY` clause.

### Running k6 Against Your API

To run k6 load-testing benchmarks against your API, you first need to install k6 on your machine. You can do so by following the instructions [here](https://k6.io/docs/get-started/installation/). Once that is done, you should be able to run `k6 run server/benchmarking.js` and see your results.

## Development Setup

1. Install dependencies: `npm install`
1. Create the database: `createdb todo`
1. Run your migrations: `psql -f server/migration.sql todo`

## Scripts

**Root**

- `npm run dev` - Runs the API server and hosts your frontend assets.
- `npm run dev:server` - Runs the API server in watch mode.
- `npm run dev:client` - Hosts your frontend assets.

**/client**

- `npm run dev` - Hosts your assets.
- `npm run build` - Builds your assets (mainly used in CI/CD).

**/server**

- `npm run dev` - Runs the server in watch mode.
- `npm run start` - Starts the server (mainly used when deploying).
