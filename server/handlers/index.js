const apiHandler = (ctx) => {
  ctx.status = 200;
  ctx.body = 'This is the api.';
}

const appHandler = (ctx) => {
  ctx.status = 200;
  ctx.body = 'This is the app.';
}

module.exports = {
  apiHandler,
  appHandler,
};
