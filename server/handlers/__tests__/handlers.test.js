import { apiHandler, appHandler } from '..';

describe('Handlers', () => {
  let ctx;

  beforeEach(() => {
    ctx = {};
  });

  describe('apiHandler', () => {
    it('returns a 200 status', () => {
      apiHandler(ctx)
      expect(ctx.status).toEqual(200)
    })
  });

  describe('appHandler', () => {
    it('returns a 200 status', () => {
      appHandler(ctx)
      expect(ctx.status).toEqual(200)
    })
  });
});
