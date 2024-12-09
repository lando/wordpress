---
title: Configuration
description: Learn how to configure the Lando WordPress recipe.
---

# Configuration

While Lando [recipes](https://docs.lando.dev/landofile/recipes.html) set sane defaults so they work out of the box, they are also [configurable](https://docs.lando.dev/landofile/recipes.html#config).

Here are the configuration options, set to the default values, for this recipe's [Landofile](https://docs.lando.dev/landofile). If you are unsure about where this goes or what this means we *highly recommend* scanning the [recipes documentation](https://docs.lando.dev/landofile/recipes.html) to get a good handle on how the magicks work.

```yaml
recipe: wordpress
config:
  php: '7.4'
  composer_version: '2.0.7'
  via: apache:2.4
  webroot: .
  database: mysql:5.7
  xdebug: false
  config:
    database: SEE BELOW
    php: SEE BELOW
    server: SEE BELOW
    vhosts: SEE BELOW
```

Note that if the above config options are not enough, all Lando recipes can be further [extended and overriden](https://docs.lando.dev/landofile/recipes.html#extending-and-overriding-recipes).

## Choosing a php version

You can set `php` to any version that is available in our [php service](https://docs.lando.dev/plugins/php). However, you should consult the [WordPress requirements](https://wordpress.org/about/requirements/) to make sure that version is actually supported by WordPress itself.

The [recipe config](https://docs.lando.dev/landofile/recipes.html#config) to set the WordPress recipe to use `php` version `7.1` is shown below:

```yaml
recipe: wordpress
config:
  php: '7.1'
```
## Choosing a composer version

You can set `composer_version` to any version that is available in our [php service](https://docs.lando.dev/plugins/php/config.html#installing-composer).

```yaml
recipe: wordpress
config:
  composer_version: '1.10.1'
```

## Choosing a web server

By default, this recipe will be served by the default version of our [apache](https://docs.lando.dev/plugins/apache) service but you can also switch this to use [`nginx`](https://docs.lando.dev/plugins/nginx). We *highly recommend* you check out both the [apache](https://docs.lando.dev/plugins/apache) and [nginx](https://docs.lando.dev/plugins/nginx) services before you change the default `via`.

#### With Apache (default)

```yaml
recipe: wordpress
config:
  via: apache
```

#### With nginx

```yaml
recipe: wordpress
config:
  via: nginx
```

## Choosing a database backend

By default, this recipe will use the default version of our [mysql](https://docs.lando.dev/plugins/mysql) service as the database backend but you can also switch this to use [`mariadb`](https://docs.lando.dev/plugins/mariadb) or ['postgres'](https://docs.lando.dev/plugins/postgres) instead. Note that you can also specify a version *as long as it is a version available for use with lando* for either `mysql`, `mariadb` or `postgres`.

If you are unsure about how to configure the `database`, we *highly recommend* you check out the [mysql](https://docs.lando.dev/plugins/mysql), [mariadb](https://docs.lando.dev/plugins/mariadb)and ['postgres'](https://docs.lando.dev/plugins/postgres) services before you change the default.

Also note that like the configuration of the `php` version you should consult the [WordPress requirements](https://wordpress.org/about/requirements/) to make sure the `database` and `version` you select is actually supported by WordPress itself.

#### Using MySQL (default)

```yaml
recipe: wordpress
config:
  database: mysql
```

#### Using MariaDB

```yaml
recipe: wordpress
config:
  database: mariadb
```

#### Using Postgres

```yaml
recipe: wordpress
config:
  database: postgres
```

#### Using a custom version

```yaml
recipe: wordpress
config:
  database: postgres:14
```

## wp-config.php

If you are setting up an existing WordPress site you _probably_ need to modify the `wp-config.php` so that Lando can connect to your database.

::: tip Your DB connection info may differ
Note that your database credentials may differ from below since they are customizable. If you have done this we recommend you run `lando info` first and use the `internal_connection` information to populate the below values.
:::

Here are a few ways you can modify `wp-config.php` for usage with Lando. You will want to make sure these go at the _TOP_ of `wp-config.php`.

**1. Hardcode the values**

```php
/** This will ensure these are only loaded on Lando  */
if (getenv('LANDO')) {
  /** The name of the database for WordPress */
  define('DB_NAME', 'wordpress');
  /** MySQL database username */
  define('DB_USER', 'wordpress');
  /** MySQL database password */
  define('DB_PASSWORD', 'wordpress');
  /** MySQL hostname */
  define('DB_HOST', 'database');

  /** URL routing (Optional, may not be necessary) */
  // define('WP_HOME','http://mysite.lndo.site');
  // define('WP_SITEURL','http://mysite.lndo.site');
}
```

**2. Use LANDO_INFO**

```php
/** This will ensure these are only loaded on Lando */
if (getenv('LANDO_INFO')) {
  /**  Parse the LANDO INFO  */
  $lando_info = json_decode(getenv('LANDO_INFO'));

  /** Get the database config */
  $database_config = $lando_info->database;
  /** The name of the database for WordPress */
  define('DB_NAME', $database_config->creds->database);
  /** MySQL database username */
  define('DB_USER', $database_config->creds->user);
  /** MySQL database password */
  define('DB_PASSWORD', $database_config->creds->password);
  /** MySQL hostname */
  define('DB_HOST', $database_config->internal_connection->host);

  /** URL routing (Optional, may not be necessary) */
  // define('WP_HOME','http://mysite.lndo.site');
  // define('WP_SITEURL','http://mysite.lndo.site');
}
```

We also recommend you check out [this helpful doc](https://developer.wordpress.org/advanced-administration/wordpress/wp-config/) on the `wp-config.php` file.


## Connecting to your database

Lando will automatically set up a database with a user and password and also set an environment variable called [`LANDO INFO`](https://docs.lando.dev/guides/lando-info.html) that contains useful information about how your application can access other Lando services.

The default database connection information for a WordPress site is shown below:

Note that the `host` is not `localhost` but `database`.

```yaml
database: wordpress
username: wordpress
password: wordpress
host: database
# for mysql
port: 3306
# for postgres
# port: 5432
```

You can get also get the above information, and more, by using the [`lando info`](https://docs.lando.dev/cli/info.html) command.

## Using custom config files

You may need to override our [default WordPress config](https://github.com/lando/wordpress/tree/main/builders) with your own.

If you do this, you must use files that exist inside your application and express them relative to your project root as shown below:

Note that the default files may change based on how you set both `ssl` and `via`. Also note that the `vhosts` and `server` config will be either for `apache` or `nginx` depending on how you set `via`. We *highly recommend* you check out both the [apache](https://docs.lando.dev/plugins/apache/config.html) and [nginx](https://docs.lando.dev/plugins/nginx/config.html) if you plan to use a custom `vhosts` or `server` config.

**A hypothetical project**

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory but you can call it whatever you want such as `.lando` in the example below:

```bash
./
|-- config
   |-- default.conf
   |-- my-custom.cnf
   |-- php.ini
   |-- server.conf
|-- index.php
|-- .lando.yml
```

**Landofile using custom wordpress config**

```yaml
recipe: wordpress
config:
  config:
    database: config/my-custom.cnf
    php: config/php.ini
    server: config/server.conf
    vhosts: config/default.conf
```
