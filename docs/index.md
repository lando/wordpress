---
title: WordPress Lando Plugin
description: Use WordPress on Lando for local development; powered by Docker and Docker Compose, config php version, swap db backends or web server, use composer, wp cli, xdebug and custom config files, oh and also import and export databases.
next: ./getting-started.html
---

# WordPress

WordPress is open source software you can use to create a beautiful website, blog, or app.

Lando offers a configurable [recipe](https://docs.lando.dev/config/recipes.html) for developing [WordPress](https://wordpress.org/) apps.

#### Features of this plugin:

* Configurable `php` version from `5.3` all the way to `8.1`
* Configurable `webroot`
* Configurable web server (`apache` or `nginx`)
* Configurable database backend (`mariadb`, `mysql`, or `postgres`)
* Configurable `composer`
* `wp cli`
* `xdebug`

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item LANDO 3.21+
```bash:no-line-numbers
lando plugin-add @lando/wordpress
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/wordpress
```
:::
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/wordpress" line to install a particular version eg
# npm install @lando/wordpress@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:18-alpine sh -c \
  "npm init -y \
  && npm install @lando/wordpress --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/wordpress \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/wordpress /plugins/@lando/wordpress"

# Rebuild the plugin cache
lando --clear
```
:::
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/wordpress`. This command will also show you _where_ the plugin is being loaded from.
