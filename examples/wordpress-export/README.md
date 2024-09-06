# Wordpress Export Example

This example exists primarily to test the following documentation:

* [Wordpress Recipe](https://docs.lando.dev/wordpress/tooling.html#importing-your-database)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should be able to connect to the relevant databases
lando mysql wordpress -e quit

# Should be able to import into database by default
lando db-import mysql-test.sql
lando mysql wordpress -e "show tables;" | grep users

# Should be able to import into user specified database
lando db-import -h database mysql-test.sql
lando mysql wordpress -e "show tables;" | grep users

# Should be able to export the contents of the dbs
lando db-export
lando db-export -h database another-one.sql

# Should export to filename if specified
lando db-export database.dump.sql
lando db-export -h database database2.dump.sql

# Should export to absolute path if specified
lando db-export /tmp/database.dump.sql
lando exec database -- stat /tmp/database.dump.sql.gz

# Should dump ungizzeed stdout
lando db-export --stdout > thing.sql
cat thing.sql | grep Dump
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
