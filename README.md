# WordPress Lando Plugin

This is the _official_ [Lando](https://lando.dev) plugin for [WordPress](https://wordpress.org/). When installed it...

* Allows users to run `wordpress` cms
* Allows users to configure `php` version from `5.3` all the way to `8.1`
* Allows users to configure `webroot`
* Allows users to configure web server to (`apache` or `nginx`)
* Allows users to configure database backend to (`mariadb`, `mysql`, or `postgres`)
* Allows users to configure `composer`
* Allows users to run `wp cli` commands
* Allows users to configure `xdebug`

Of course, once a user is running their WordPress project with Lando they can take advantage of [all the other awesome development features](https://docs.lando.dev) Lando provides.

## Basic Usage

Add a `wordpress` recipe to your Landofile

```yaml
name: wordpress-app
recipe: wordpress
```

For more info you should check out the [docs](https://docs.lando.dev/wordpress):

* [Getting Started](https://docs.lando.dev/wordpress/getting-started.html)
* [Configuration](https://docs.lando.dev/wordpress/config.html)
* [Tooling](https://docs.lando.dev/wordpress/tooling.html)
* [Examples](https://github.com/lando/wordpress/tree/main/examples)
* [Development](https://docs.lando.dev/wordpress/development.html)

## Issues, Questions and Support

If you have a question or would like some community support we recommend you [join us on Slack](https://launchpass.com/devwithlando).

If you'd like to report a bug or submit a feature request then please [use the issue queue](https://github.com/lando/wordpress/issues/new/choose) in this repo.

## Changelog

We try to log all changes big and small in both [THE CHANGELOG](https://github.com/lando/wordpress/blob/main/CHANGELOG.md) and the [release notes](https://github.com/lando/wordpress/releases).


## Maintainers

* [@pirog](https://github.com/pirog)
* [@reynoldsalec](https://github.com/reynoldsalec)

## Contributors

<a href="https://github.com/lando/wordpress/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lando/wordpress" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Other Selected Resources

* [LICENSE](https://github.com/lando/wordpress/blob/main/LICENSE.md)
* [The best professional advice ever](https://www.youtube.com/watch?v=tkBVDh7my9Q)
