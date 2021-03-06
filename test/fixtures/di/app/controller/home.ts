import { Controller } from 'egg';
import { lazyInject, inject } from '../../../../../lib';
import { TestService } from '../service/test';
import { AppLevelService } from '../service/app';
import { Test2Service } from '../service/test2';

export default class HomeController extends Controller {
  @lazyInject()
  private testService: TestService;

  @lazyInject(TestService)
  private testService2: any; // without typescript metadata gen.

  @inject()
  private testService3: TestService;

  @lazyInject()
  private appLevelService: AppLevelService;

  @lazyInject()
  private testService4: Test2Service;

  public async index() {
    this.ctx.body = await this.testService.sayHi('egg');
  }

  public async inject() {
    this.ctx.body = await this.testService3.sayHi('egg');
  }

  public async notype() {
    this.ctx.body = await this.testService2.sayHi('egg');
  }

  public async getComponent() {
    this.ctx.body = await this.ctx.getComponent(TestService).sayHi('service');
  }

  public async appCount() {
    this.ctx.body = await this.appLevelService.get();
  }

  public async appGetComponent() {
    this.ctx.body = await this.app.getComponent<AppLevelService>(AppLevelService).get();
  }

  public async mutli() {
    this.ctx.body = await this.testService4.sayHi('egg');
  }
}
