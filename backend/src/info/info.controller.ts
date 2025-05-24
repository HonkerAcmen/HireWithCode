import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}
  @Get('')
  async getInfoById(@Param('id') id: number) {
    return await this.infoService.getInfoById(id);
  }

  @Get('/all')
  async getAllInfo() {
    return await this.infoService.getAllInfo();
  }

  @Post('/create')
  async create(
    @Body('email') email: string,
    @Body('github_id') github_id: string,
    @Body('github_pj_add') github_pj_add: string,
    @Body('project_online_add') project_online_add: string,
  ) {
    return await this.infoService.create(
      email,
      github_id,
      github_pj_add,
      project_online_add,
    );
  }

  @Post('/set')
  async setInfoByGithubId(
    @Body('github_id') github_id: string,
    @Body('github_pj_add') github_pj_add: string,
    @Body('project_online_add') project_online_add: string,
  ) {
    return await this.infoService.setInfoByGithubId(
      github_id,
      github_pj_add,
      project_online_add,
    );
  }
}
