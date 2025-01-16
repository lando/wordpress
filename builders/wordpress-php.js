'use strict';

const path = require('path');
const landoPhpPath = path.join(__dirname, '../node_modules/@lando/php');
const LandoPhp = require(`${landoPhpPath}/builders/php.js`);

/**
 * Wordpress PHP builder class that extends Lando PHP builder.
 * Uses the bundled version of @lando/php plugin instead of user's version.
 *
 * @module wordpress-php
 */
module.exports = {
  name: 'wordpress-php',
  parent: '_appserver',
  /**
   * Builder function that returns the WordpressPhp class
   * @param {Object} parent - Parent builder class
   * @return {Class} WordpressPhp class extending LandoPhp builder
   */
  builder: parent => class WordpressPhp extends LandoPhp.builder(parent, LandoPhp.config) {
    /**
     * Create a new WordpressPhp instance
     * @param {string} id - Service id
     * @param {Object} options - Service options
     * @param {Object} factory - App factory instance
     */
    constructor(id, options = {}, factory) {
      options.nginxServiceType = 'wordpress-nginx';
      super(id, options, factory);
    }
  },
};
