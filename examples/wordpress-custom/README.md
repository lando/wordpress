# Wordpress Custom 8Example

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
# Should serve from bob folder
lando ssh -s appserver -c "curl -L appserver_nginx" | grep "HI BOB"

# Should be serving from nginx 1.17
lando ssh -s appserver_nginx -c "nginx -v" 2>&1 | grep "nginx version" | grep "nginx/1.17"
lando ssh -s appserver -c "curl -IL appserver_nginx" | grep Server | grep nginx

# Should use php 8.3
lando php -v | grep "PHP 8.3"

# Should use composer 2.0.7
lando ssh -s appserver -c "/bin/sh -c 'NO_COLOR=1 composer -V'" | grep "Composer version 2.0.7"

# Should be running mysql 5.7 by default
lando mysql -V | grep 5.7

# Should have COMPOSER_MEMORY_LIMIT set to -1
lando ssh -s appserver -c "env" | grep "COMPOSER_MEMORY_LIMIT=-1"

# Should allow environment variable PHP_MEMORY_LIMIT to work if used in config file
lando ssh -s appserver -c "curl -L appserver_nginx/info.php" | grep memory_limit | grep 2G

# Should have unlimited memory for php for CLI opts
lando php -i | grep memory_limit | grep -e "-1"
lando ssh -s appserver -c "php -i" | grep "memory_limit" | grep -e "-1"

# Should be able to connect to the database with the default creds
lando mysql wordpress -e quit

# Should have xdebug enabled
lando php -m | grep Xdebug

# Should be using custom config files
lando ssh -s appserver -c "curl -L appserver_nginx/info.php" | grep max_execution_time | grep 92
lando ssh -s appserver_nginx -c "cat /opt/bitnami/nginx/conf/vhosts/lando.conf" | grep server_name | grep pirog
lando mysql -u root -e "show variables;" | grep thread_cache_size | grep 12
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
