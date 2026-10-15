WordPress MySQL 8.4 Example
===========================

This example exists primarily to test the following documentation:

* [WordPress Recipe](https://docs.devwithlando.io/tutorials/wordpress.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest WordPress codebase
rm -rf mysql84 && mkdir -p mysql84 && cd mysql84
lando init --source remote --remote-url https://wordpress.org/latest.tar.gz --recipe wordpress --webroot wordpress --name lando-wordpress-mysql84 --option database=mysql:8
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml

# Should start up successfully
cd mysql84
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the WordPress installation page by default
cd mysql84
lando exec appserver -- curl -L localhost | grep "WordPress"

# Should use 8.3 as the default php version
cd mysql84
lando php -v | grep "PHP 8.3"

# Should be running apache 2.4 by default
cd mysql84
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mysql 8.4.x via the mysql:8 alias
cd mysql84
lando mysql -V | grep '8.4.'

# Should not enable xdebug by default
cd mysql84
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd mysql84
lando mysql -uwordpress -pwordpress wordpress -e quit

# Should use the default mysql8 config file
cd mysql84
lando exec database -- cat /opt/bitnami/mysql/conf/my_custom.cnf | grep "LANDOWORDPRESSMYSQL8CNF"
lando mysql -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 127

# Should use binlog_expire_logs_seconds instead of the removed expire_logs_days
cd mysql84
lando mysql -u root -e "show variables;" | grep binlog_expire_logs_seconds | grep 864000

# Should have the 2.x wp-cli
cd mysql84
lando wp cli version | grep "WP-CLI 2."

# Should create a wp-config file
cd mysql84/wordpress
lando wp config create --dbname=wordpress --dbuser=wordpress --dbpass=wordpress --dbhost=database --force

# Should be able to install wordpress
cd mysql84/wordpress
lando wp core install --url=lando-wordpress.lndo.site --title=LandoPress --admin_user=admin --admin_email=mike@pirog.com --skip-email
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mysql84
lando destroy -y
lando poweroff
```
