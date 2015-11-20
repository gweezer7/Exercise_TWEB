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
    db: 'mongodb://gweezer7:gweezer7@ds059908.mongolab.com:59908/heroku_nbdh6h3w'
  },

  test: {
    root: rootPath,
    app: {
      name: 'tweb-angular'
    },
    port: 3000,
    db: 'mongodb://gweezer7:gweezer7@ds059908.mongolab.com:59908/heroku_nbdh6h3w'
  },

  production: {
    root: rootPath,
    app: {
      name: 'tweb-angular'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://gweezer7:gweezer7@ds059908.mongolab.com:59908/heroku_nbdh6h3w'
  }
};

module.exports = config[env];
