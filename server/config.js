const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: [ 'production', 'development' ],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port'
  },
});

const env = config.get('env');

config.loadFile(`${ __rootdir }/config/env/${ env }.json`);
config.validate({ allowed: 'strict' });

module.exports = config;
