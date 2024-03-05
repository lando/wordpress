'use strict';

// Modules
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

// WP status check
const getWpStatusCheck = (version = '7.4') => {
  if (version === '5.3') return ['true'];
  else return ['php', '/usr/local/bin/wp', '--info'];
};

// Helper to get WPCLI version
const getWpCliUrl = (version = '7.4') => {
  if (version === '5.3') return 'https://github.com/wp-cli/wp-cli/releases/download/v1.5.1/wp-cli-1.5.1.phar';
  else return 'https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar';
};

/*
 * Helper to get services
 */
const getServices = options => ({
  appserver: {
    build_as_root_internal: options.build_root,
    build_internal: options.build,
    composer: options.composer,
    composer_version: options.composer_version,
    config: getServiceConfig(options),
    run_as_root_internal: options.run_root,
    ssl: true,
    type: `wordpress-php:${options.php}`,
    via: options.via,
    xdebug: options.xdebug,
    webroot: options.webroot,
    nginxServiceType: `wordpress-${options.via}`,
  },
  database: {
    config: getServiceConfig(options, ['database']),
    authentication: 'mysql_native_password',
    type: `wordpress-${options.database}`,
    portforward: true,
    creds: {
      user: options.recipe,
      password: options.recipe,
      database: options.recipe,
    },
  },
});

/*
 * Helper to get service config
 */
const getServiceConfig = (options, types = ['php', 'server', 'vhosts']) => {
  const config = {};
  _.forEach(types, type => {
    if (_.has(options, `config.${type}`)) {
      config[type] = options.config[type];
    } else if (!_.has(options, `config.${type}`) && _.has(options, `defaultFiles.${type}`)) {
      if (_.has(options, 'confDest')) {
        config[type] = path.join(options.confDest, options.defaultFiles[type]);
      }
    }
  });
  return config;
};

// Tooling defaults
const getDatabaseType = options => {
  return _.get(options, '_app.config.services.database.type', options.database) ?? 'mysql';
};

const toolingDefaults = {
  'composer': {
    service: 'appserver',
    cmd: 'composer --ansi',
  },
  'db-import <file>': {
    service: ':host',
    description: 'Imports a dump file into a database service',
    cmd: '/helpers/sql-import.sh',
    user: 'root',
    options: {
      'host': {
        description: 'The database service to use',
        default: 'database',
        alias: ['h'],
      },
      'no-wipe': {
        description: 'Do not destroy the existing database before an import',
        boolean: true,
      },
    },
  },
  'db-export [file]': {
    service: ':host',
    description: 'Exports database from a database service to a file',
    cmd: '/helpers/sql-export.sh',
    user: 'root',
    options: {
      host: {
        description: 'The database service to use',
        default: 'database',
        alias: ['h'],
      },
      stdout: {
        description: 'Dump database to stdout',
      },
    },
  },
  'php': {
    service: 'appserver',
    cmd: 'php',
  },
};

// Default DB cli commands
const mysqlCli = {
  service: ':host',
  description: 'Drops into a MySQL shell on a database service',
  cmd: 'mysql -uroot',
  options: {
    host: {
      description: 'The database service to use',
      default: 'database',
      alias: ['h'],
    },
  },
};
const postgresCli = {
  service: ':host',
  description: 'Drops into a psql shell on a database service',
  cmd: 'psql -Upostgres',
  user: 'root',
  options: {
    host: {
      description: 'The database service to use',
      default: 'database',
      alias: ['h'],
    },
  },
};

/*
 * Helper to get the phar build command
 */
const getDbTooling = database => {
  // Make sure we strip out any version number
  database = database.split(':')[0];
  // Choose wisely
  if (_.includes(['mysql', 'mariadb'], database)) {
    return {mysql: mysqlCli};
  } else if (database === 'postgres') {
    return {psql: postgresCli};
  } else if (database === 'mongo') {
    return {mongo: {
      service: 'database',
      description: 'Drop into the mongo shell',
    }};
  }
};

/*
 * Helper to get config defaults
 */
const getConfigDefaults = options => {
  // Get the viaconf
  if (_.startsWith(options.via, 'nginx')) options.defaultFiles.vhosts = 'default.conf.tpl';

  // attempt to discover the database that is actually being used
  // @NOTE: this will look to see if database is overridden
  const dbConfig = getDatabaseType(options);
  const database = _.first(dbConfig.split(':'));
  const version = _.last(dbConfig.split(':')).substring(0, 2);
  if (database === 'wordpress-mysql' || database === 'mysql' || database === 'mariadb') {
    if (version === '8.') {
      options.defaultFiles.database = 'mysql8.cnf';
    } else {
      options.defaultFiles.database = 'mysql.cnf';
    }
  }

  // Verify files exist and remove if it doesn't
  _.forEach(options.defaultFiles, (file, type) => {
    if (!fs.existsSync(`${options.confDest}/${file}`)) {
      delete options.defaultFiles[type];
    }
  });

  return options.defaultFiles;
};

/*
 * Helper to get tooling
 */
const getTooling = options => _.merge({}, toolingDefaults, getDbTooling(options.database));

/*
 * Build WordPress
 */
module.exports = {
  name: 'wordpress',
  parent: '_recipe',
  config: {
    build: [],
    confSrc: path.resolve(__dirname, '..', 'config'),
    config: {},
    database: 'mysql:5.7',
    defaultFiles: {
      php: 'php.ini',
    },
    php: '7.4',
    tooling: {wp: {service: 'appserver'}},
    via: 'apache',
    webroot: '.',
    xdebug: false,
    proxy: {},
  },
  builder: (parent, config) => class LandoWordPress extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Add the wp cli install command
      options.build.unshift(require('../utils/get-phar')(
        getWpCliUrl(options.version),
        '/tmp/wp-cli.phar',
        '/usr/local/bin/wp',
        getWpStatusCheck(options.version),
      ));
      // Rebase on top of any default config we might already have
      options.defaultFiles = _.merge({}, getConfigDefaults(_.cloneDeep(options)), options.defaultFiles);

      options.services = _.merge({}, getServices(options), options.services);
      options.tooling = _.merge({}, getTooling(options), options.tooling);
      // Switch the proxy if needed
      if (!_.has(options, 'proxyService')) {
        if (_.startsWith(options.via, 'nginx')) options.proxyService = 'appserver_nginx';
        else if (_.startsWith(options.via, 'apache')) options.proxyService = 'appserver';
      }
      options.proxy = _.set(options.proxy, options.proxyService, [`${options.app}.${options._app._config.domain}`]);

      // Downstream
      // Send downstream
      super(id, options);
    };
  },
};
