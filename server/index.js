global.__rootdir = require('path').resolve(__dirname, '../');
const app = require('./app');
const config = require('./config');

const PORT = config.get('port');

app.listen(PORT, () => {
  console.info(`http://localhost:${ PORT }`); // eslint-disable-line no-console
});
