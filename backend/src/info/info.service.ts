import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InfoEntity } from './info.entity';

@Injectable()
export class InfoService {
  constructor(
    @Inject('INFO_REPOSITORY')
    private readonly infoRepository: Repository<InfoEntity>,
  ) {}

  async getInfoById(id: number) {
    return this.infoRepository.findOneBy({ id });
  }

  async getAllInfo() {
    return this.infoRepository.find();
  }

  async create(
    email: string,
    github_id: string,
    github_pj_add: string,
    project_online_add: string,
  ) {
    const newinfo = {
      email: email,
      github_id: github_id,
      github_pj_add: github_pj_add,
      project_online_add: project_online_add,
      create_time: new Date(),
    };
    const data = this.infoRepository.create(newinfo);
    try {
      this.infoRepository.save(data);
      return {
        code: 1,
        msg: '创建成功',
        data: '',
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('创建失败', 500);
    }
  }

  async setInfoById(
    id: number,
    email: string,
    github_id: string,
    github_pj_add: string,
    project_online_add: string,
  ) {
    const res = await this.infoRepository.findOneBy({ id });
    if (!res) {
      throw new HttpException('没有此id的数据', 404);
    }
    res.email = email;
    res.github_id = github_id;
    res.github_pj_add = github_pj_add;
    res.project_online_add = project_online_add;
    const data = this.infoRepository.create(res);
    try {
      this.infoRepository.save(data);
      return {
        code: 1,
        msg: '修改成功',
        data: '',
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('修改失败', 500);
    }
  }
}
