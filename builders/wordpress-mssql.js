'use strict';

const _ = require('lodash');
const LandoMssql = require('./../node_modules/@lando/mssql/builders/mssql.js');

// Builder
module.exports = {
  name: 'wordpress-mssql',
  parent: '_service',
  builder: parent => class WordpressMssql extends LandoMssql.builder(parent, LandoMssql.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    }
  },
};
