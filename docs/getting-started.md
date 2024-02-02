---
description: Learn how to get started with the Lando WordPress recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe we assume that you have:

1. [Installed Lando](https://docs.lando.dev/getting-started/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/cli/).
2. [Initialized](https://docs.lando.dev/cli/init.html) a [Landofile](https://docs.lando.dev/core/v3) for your codebase for use with this recipe.
3. Read about the various [services](https://docs.lando.dev/core/v3/lando-service.html), [tooling](https://docs.lando.dev/core/v3/tooling.html), [events](https://docs.lando.dev/core/v3/events.html) and [routing](https://docs.lando.dev/core/v3/proxy.html) Lando offers.

## Quick Start

Try out the relevant commands below to spin up a new Landoified vanilla WordPress site.

```bash
# Create folder and enter it
mkdir wordpress && cd wordpress

# Initialize a wordpress recipe using the latest WordPress version
lando init \
  --source remote \
  --remote-url https://wordpress.org/latest.tar.gz \
  --recipe wordpress \
  --webroot wordpress \
  --name my-first-wordpress-app

# Start it up
lando start

# List information about this app
lando info

# Create a WordPress config file
lando wp config create \
  --dbname=wordpress \
  --dbuser=wordpress \
  --dbpass=wordpress \
  --dbhost=database \
  --path=wordpress

# Install WordPress
lando wp core install \
  --url=https://my-first-wordpress-app.lndo.site/ \
  --title="My First Wordpress App" \
  --admin_user=admin \
  --admin_password=password \
  --admin_email=admin@my-first-wordpress-app.lndo.site \
  --path=wordpress
```

Log in with `admin` and `password` at https://my-first-wordpress-app.lndo.site/wp-login.php

