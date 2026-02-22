## {{ UNRELEASED_VERSION }} - [{{ UNRELEASED_DATE }}]({{ UNRELEASED_LINK }})

* Updated `lando init` to set recommended PHP 8.3 and MySQL 8.0 versions in generated Landofile
* Added `wordpress-recommended` example with explicit version configuration
* Updated docs to recommend always setting explicit `php` and `database` versions
* Updated `@lando/php` to `^1.11.1`
* Updated to [@lando/argv@1.2.0](https://github.com/lando/argv/releases/tag/v1.2.0)

## v1.10.0 - [February 20, 2026](https://github.com/lando/wordpress/releases/tag/v1.10.0)

* Updated to [@lando/php@1.11.0](https://github.com/lando/php/releases/tag/v1.11.0)
* Fixed release workflow trigger to fire on `published` instead of `created`
* Updated CI actions (`actions/checkout` to v6, `actions/setup-node` to v6, `actions/cache` to v5)
* Pending dependabot bumps for `@lando/mariadb` and `@lando/postgres`

## v1.9.0 - [September 2, 2025](https://github.com/lando/wordpress/releases/tag/v1.9.0)

* Switched images to [bitnamilegacy](https://github.com/bitnami/containers/issues/83267) namespace
* Updated to [@lando/mariadb@1.7.0](https://github.com/lando/mariadb/releases/tag/v1.7.0)
* Updated to [@lando/mysql@1.6.0](https://github.com/lando/mysql/releases/tag/v1.6.0)
* Updated to [@lando/nginx@1.5.0](https://github.com/lando/nginx/releases/tag/v1.5.0)
* Updated to [@lando/php@1.8.0](https://github.com/lando/php/releases/tag/v1.8.0)
* Updated to [@lando/postgres@1.5.0](https://github.com/lando/postgres/releases/tag/v1.5.0)

## v1.8.0 - [December 9, 2024](https://github.com/lando/wordpress/releases/tag/v1.8.0)

* Optimized for `midcore`
* Removed uneeded `@lando/apache` dependency
* Updated to [@lando/mariadb@1.6.3](https://github.com/lando/mariadb/releases/tag/v1.6.3).
* Updated to [@lando/mssql@1.4.3](https://github.com/lando/mssql/releases/tag/v1.4.3).
* Updated to [@lando/mysql@1.4.4](https://github.com/lando/mysql/releases/tag/v1.4.4).
* Updated to [@lando/php@1.6.3](https://github.com/lando/php/releases/tag/v1.6.3).
* Updated to [@lando/postgres@1.4.4](https://github.com/lando/postgres/releases/tag/v1.4.4).

## v1.7.3 - [December 6, 2024](https://github.com/lando/wordpress/releases/tag/v1.7.3)

* Updated the version index.md to get Docuverse page to build correctly.

## v1.7.2 - [December 4, 2024](https://github.com/lando/wordpress/releases/tag/v1.7.2)

* Updated to [@lando/vitepress-theme-default-plus@v1.1.0-beta.24](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.1.0-beta.24).

## v1.7.1 - [November 4, 2024](https://github.com/lando/wordpress/releases/tag/v1.7.1)

* Updated to [@lando/vitepress-theme-default-plus@v1.1.0-beta.18](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.1.0-beta.18).

## v1.7.0 - [October 25, 2024](https://github.com/lando/wordpress/releases/tag/v1.7.0)

* Updated release process to generate an edge release when stable releases are created.
* Removed unnecessary dependency lando/nginx.

## v1.6.0 - [October 18, 2024](https://github.com/lando/wordpress/releases/tag/v1.6.0)

 * Updated lando/php to v1.5.0.

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
