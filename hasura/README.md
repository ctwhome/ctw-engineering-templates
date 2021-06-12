# Hasura playground and how to's
t is a typical requirement to export an existing Hasura “setup” so that you can apply it on another instance to reproduce the same setup. For example, to achieve a dev -> staging -> production environment promotion scenario.

Hasura needs 2 pieces of information to recreate your GraphQL API, the underlying PG database schema and the Hasura metadata which is used to describe the exposed GraphQL API.

```shell
# Export current metadata version into hasura folder
hasura metadata export --endpoint http://localhost:8080 --admin-secret adminpassword
hasura metadata apply
```

## Enabling console in production
You may want to have access to hasura console in production. Remember that changes in the hasura console won't change the migrations files, but it could be useful to check if the API is working properly.
Another solution to see if the GraphQL Hasura API is working properly is to connect to the remote server endpoint with Hasura CLI
```shell
# Start console on a different address and ports:
hasura console --address 0.0.0.0 --console-port 8080 --api-port 8081 --admin-secret "<admin-secret>"


# Connect to an instance specified by the flag, overrides the one mentioned in config.yaml:
hasura console --endpoint "<http(s) endpoint" --admin-secret "<admin-secret>"

```
More options [here](https://hasura.io/docs/1.0/graphql/core/hasura-cli/hasura_console.html#hasura-console)
## Hasura console schemas
There are two concepts:
* **Hasura migrations**: the underlying PG database schema. This can be done by any Postgres tool that handles Postgres schemas, but hasura has implemented its own tool (with Hasura CLI) for PG migrations. 
  The state of your PG database is managed via incremental SQL migration files. These migration files can be applied one after the other to achieve the final DB schema.
  DB migration files can be generated incrementally and can by applied in parts to reach particular checkpoints. They can be used to roll-back the DB schema as well.
  
* **Hasura Metadata**: it exposes GraphQL API. The state of Hasura metadata is managed via snapshots of the metadata. These snapshots can be applied as a whole to configure Hasura to a state represented in the snapshot.

Hasura metadata can be exported and imported as a whole.


Tracking changes to the hasura console includes:
- Permissions
- Track tables
- Tracking functions

Not including: 
- Changes to data
- Changes to tables

### Open console
```shell
cd hasura && hasura console --admin-secret adminpassword
```

## Seed data to the DB on init
To add init data (seed data) when initiating the data base for first time.
https://hasura.io/docs/1.0/graphql/core/migrations/advanced/seed-data-migration.html

## Add hasura to a project
```shell
npm i -g hasura-cli
hasura init hasura  # I usually call this project "hasura" itself to play around with your current project
```

## Applying Migrations and Metadata in a remote server

```shell
# export the metadata, This command will export the current Hasura metadata as a bunch of YAML files in the metadata directory.
hasura metadata export

# migrations
hasura migrate create "init" --from-server

# note down the version

# mark the migration as applied on this server
hasura migrate apply --version "<version>" --skip-execution
```

