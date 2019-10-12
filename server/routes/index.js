const Router = require('koa-router');

const { apiHandler, appHandler } = require('../handlers');

const router = new Router();

router.get('/api', apiHandler);
router.get('/app', appHandler);

module.exports = router;
