import * as request from 'supertest';
import mm from 'egg-mock';

describe('di auto register', () => {
  let app: any;
  before(() => {
    app = mm.app({
      baseDir: 'di-auto-register',
    });
    return app.ready();
  });

  after(() => app.close());

  afterEach(mm.restore);

  it('lazyInject', () => {
    return request(app.callback())
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });
});
