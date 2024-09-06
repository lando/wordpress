# Wordpress Import Example

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
lando mysql database -e quit

# Should be able to import into database by default
lando db-import mysql-test.sql
lando mysql wordpress -e "show tables;" | grep users

# Should be able to import into user specified database
lando db-import -h database subdir/test.sql
lando mysql wordpress -e "show tables;" | grep users

# Should be able to use db-import events
lando exec database -- cat /tmp/iran.txt

# Should persist data after a rebuild
lando rebuild -y
lando mysql wordpress -e "show tables;" | grep users

# Should be able to import tables with foreign key constraints
lando db-import big-bad-dump.sql
lando db-import big-bad-dump.sql
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
