'use strict';

const _ = require('lodash');
const LandoMariadb = require('./../node_modules/@lando/mariadb/builders/mariadb.js');

// Builder
module.exports = {
  name: 'wordpress-mariadb',
  parent: '_service',
  builder: parent => class WordpressMariadb extends LandoMariadb.builder(parent, LandoMariadb.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    }
  },
};
