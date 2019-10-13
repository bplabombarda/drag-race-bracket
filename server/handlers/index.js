const db = require('../db');

const apiHandler = ctx => {
  ctx.status = 200;
  ctx.body = 'This is the api.';
}

const appHandler = ctx => {
  ctx.status = 200;
  ctx.body = 'This is the app.';
}

const queensBySeasonIdHandler = async ctx => {
  const { seasonId } = ctx.query;

  const { rows } = await db.query(
    'SELECT queen.name, season.number, season.year \
      FROM queens \
      INNER JOIN season_queen \
      ON queen.id = season_queen.queen_id \
      WHERE season_queen.id = $1',
      [seasonId]
  );

  ctx.body = rows;
}

module.exports = {
  apiHandler,
  appHandler,
  queensBySeasonIdHandler,
};
