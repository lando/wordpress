# Wordpress Defaults Example

This example exists primarily to test the following documentation:

* [Wordpress Recipe](https://docs.lando.dev/wordpress/config.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should serve from app root by default
lando ssh -s appserver -c "curl -L localhost" | grep "DEFAULTS"

# Should use 7.4 as the default php version
lando php -v | grep "PHP 7.4"

# Should be running apache 2.4 by default
lando ssh -s appserver -c "apachectl -V | grep 2.4"
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should be running mysql 5.7 by default
lando mysql -V | grep 5.7

# Should have COMPOSER_MEMORY_LIMIT set to -1
lando ssh -s appserver -c "env" | grep "COMPOSER_MEMORY_LIMIT=-1"

# Should have a 1G php mem limit on appserver
lando ssh -s appserver -c "curl http://localhost/info.php" | grep "memory_limit" | grep "1G"

# Should have unlimited memory for php for CLI opts
lando php -i | grep memory_limit | grep -e "-1"
lando ssh -s appserver -c "php -i" | grep "memory_limit" | grep -e "-1"

# Should not enable xdebug by default
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
lando mysql wordpress -e quit

# Should use the correct default config files
lando ssh -s appserver -c "cat /usr/local/etc/php/conf.d/zzz-lando-my-custom.ini" | grep "; LANDOWORDPRESSPHPINI"
lando ssh -s appserver -c "curl -L http://localhost/info.php" | grep max_execution_time | grep 91
lando ssh -s database -c "cat /opt/bitnami/mysql/conf/my_custom.cnf" | grep "LANDOWORDPRESSMYSQLCNF"
lando mysql -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 121

# Should use composer 2 by default
lando ssh -s appserver -c "/bin/sh -c 'NO_COLOR=1 composer -V'" | grep "Composer version 2."
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
