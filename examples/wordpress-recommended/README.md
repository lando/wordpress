# WordPress Recommended Example

This example exists primarily to test the following documentation:

* [WordPress Recipe - Configuration](https://docs.lando.dev/wordpress/config.html)

This example uses the WordPress.org recommended versions of PHP and MySQL.

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
# Should use php 8.3
lando php -v | grep "PHP 8.3"

# Should be running mysql 8.0
lando mysql -V | grep 8.0

# Should be running apache by default
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be able to connect to the database with the default creds
lando mysql -uwordpress -pwordpress wordpress -e quit

# Should have the 2.x wp-cli
lando wp cli version | grep "WP-CLI 2."
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
