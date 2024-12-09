'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const landoPhpPath = path.join(__dirname, '../node_modules/@lando/php');
const LandoPhp = require(`${landoPhpPath}/builders/php.js`);

const loadScripts = options => {
  const lando = _.get(options, '_app._lando');
  // Move the script to the confDir and make executable.
  if (fs.existsSync(path.join(landoPhpPath, 'scripts'))) {
    const confDir = path.join(lando.config.userConfRoot, 'scripts');
    const dest = lando.utils.moveConfig(path.join(landoPhpPath, 'scripts'), confDir);
    lando.utils.makeExecutable(fs.readdirSync(dest), dest);
    lando.log.debug('automoved scripts from %s to %s and set to mode 755',
      path.join(landoPhpPath, 'scripts'), confDir);
  }
};

// Builder
module.exports = {
  name: 'wordpress-php',
  parent: '_appserver',
  builder: parent => class WordpressPhp extends LandoPhp.builder(parent, LandoPhp.config) {
    constructor(id, options = {}, factory) {
      loadScripts(options);
      options.nginxServiceType = 'wordpress-nginx';
      super(id, options, factory);
    }
  },
};
