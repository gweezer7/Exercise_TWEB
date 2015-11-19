var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tweb-angular'
    },
    port: 3000,
    db: 'mongodb://localhost/tweb-angular-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'tweb-angular'
    },
    port: 3000,
    db: 'mongodb://localhost/tweb-angular-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'tweb-angular'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/tweb-angular-production'
  }
};

module.exports = config[env];
