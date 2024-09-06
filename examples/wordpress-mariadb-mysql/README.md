WordPress MariaDB/MySQL Example
===============================

This example exists primarily to test the following documentation:

* [WordPress Recipe](https://docs.devwithlando.io/tutorials/wordpress.html)

Versions of MariaDB 10.3.x and lower do not have the mariadb command and must use the mysql executable.

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest WordPress codebase
rm -rf mariadb && mkdir -p mariadb && cd mariadb
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando init --source remote --remote-url https://wordpress.org/latest.tar.gz --recipe wordpress --webroot wordpress --name lando-wordpress-mariadb --option php=8.3 --option database=mariadb:10.3

# Should start up successfully
cd mariadb
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the WordPress installation page by default
cd mariadb
lando exec appserver -- curl -L localhost | grep "WordPress"

# Should use 8.3 as the default php version
cd mariadb
lando php -v | grep "PHP 8.3."

# Should be running apache 2.4 by default
cd mariadb
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mariadb 10.3.x by default
cd mariadb
lando mysql -V | grep "MariaDB" | grep 10.3.

# Should not enable xdebug by default
cd mariadb
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd mariadb
lando mysql -uwordpress -pwordpress wordpress -e quit

# Should use the default mariadb config file
cd mariadb
lando exec database -- cat /opt/bitnami/mariadb/conf/my_custom.cnf | grep "innodb_lock_wait_timeout = 121"
lando mysql -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 121

# Should have the 2.x wp-cli
cd mariadb
lando wp cli version | grep "WP-CLI 2."

# Should create a wp-config file
cd mariadb/wordpress
lando wp config create --dbname=wordpress --dbuser=wordpress --dbpass=wordpress --dbhost=database --force

# Should be able to install wordpress
cd mariadb/wordpress
lando wp core install --url=lando-wordpress.lndo.site --title=LandoPress --admin_user=admin --admin_email=mike@pirog.com --skip-email
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mariadb
lando destroy -y
lando poweroff
```
