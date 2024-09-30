## {{ UNRELEASED_VERSION }} - [{{ UNRELEASED_DATE }}]({{ UNRELEASED_LINK }})

## v1.5.0 - [September 30, 2024](https://github.com/lando/wordpress/releases/tag/v1.5.0)

* Updated lando/mariadb to v1.5.0.
* Updated lando/mysql to v1.3.0.

## v1.4.1 - [September 6, 2024](https://github.com/lando/wordpress/releases/tag/v1.4.1)

## Bug Fixes

* Fixed bug causing default `proxy` settings to be clobbered by user specified ones

## Internal

* Updated DevOps to use new `lando exec`
* Updated `ubuntu` test runners to `24.04`

## v1.4.0 - [May 27, 2024](https://github.com/lando/wordpress/releases/tag/v1.4.0)

* Updated mariadb plugin [#51](https://github.com/lando/mariadb/issues/51)
* Use mysql command for MariaDB 10.3.x and below
* Cleaned up test comments

## v1.3.0 - [March 8, 2024](https://github.com/lando/wordpress/releases/tag/v1.3.0)

* Updated to latest database services.

## v1.2.1 - [March 4, 2024](https://github.com/lando/wordpress/releases/tag/v1.2.1)

### Fixes

* Improved `database` selection for purposes of `config` loading, fixes some `database` bootup issues when the `database` type is overridden downstream

## v1.2.0 - [February 22, 2024](https://github.com/lando/wordpress/releases/tag/v1.2.0)

### New Features

* Added support for `php:8.3` [#39](https://github.com/lando/wordpress/issues/39)
* Added support for `php:8.2` [#39](https://github.com/lando/wordpress/issues/39)

### Fixes

* Fixed `CRITICAL` issue with default config files not loading correctly

### Internal

* Updated to `@lando/php@1.2.0`

## v1.1.0 - [February 20, 2024](https://github.com/lando/wordpress/releases/tag/v1.1.0)

* Included ability to specify `database: mssql` in the `config` section to maintain backwards compatibility. [@lando/mssql#31](https://github.com/lando/mssql/issues/31)

## v1.0.0 - [December 7, 2023](https://github.com/lando/wordpress/releases/tag/v1.0.0)

* Dialed fully for `lando update`

## v0.9.0 - [July 3, 2023](https://github.com/lando/wordpress/releases/tag/v0.9.0)

* Removed bundle-dependencies and version-bump-prompt from plugin.
* Updated package to use prepare-release-action.
* Updated documentation to reflect new release process.

## v0.8.0 - [February 24, 2022](https://github.com/lando/wordpress/releases/tag/v0.8.0)

* Add compatibility for MySQL 8.x [lando/lando#1426](https://github.com/lando/lando/issues/1462)

## v0.7.0 - [December 12, 2022](https://github.com/lando/wordpress/releases/tag/v0.7.0)

* Added bundle-dependencies to release process.
* Fixed bug in plugin dogfooding test.

## v0.6.0 - [September 7, 2022](https://github.com/lando/wordpress/releases/tag/v0.6.0)

* HYPERDRIVED

## v0.5.0 - [January 11, 2022](https://github.com/lando/wordpress/releases/tag/v0.5.0)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Initial Release
