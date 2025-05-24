"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let InfoService = class InfoService {
    constructor(infoRepository) {
        this.infoRepository = infoRepository;
    }
    async getInfoById(id) {
        return this.infoRepository.findOneBy({ id });
    }
    async getAllInfo() {
        return this.infoRepository.find();
    }
    async create(email, github_id, github_pj_add, project_online_add) {
        const res = await this.infoRepository.findOneBy({ github_id });
        if (res) {
            throw new common_1.HttpException('github id已存在', 400);
        }
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
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException('创建失败', 500);
        }
    }
    async setInfoByGithubId(github_id, github_pj_add, project_online_add) {
        const res = await this.infoRepository.findOneBy({ github_id });
        if (!res) {
            throw new common_1.HttpException('github id不存在', 404);
        }
        res.github_pj_add = github_pj_add;
        res.project_online_add = project_online_add;
        const data = this.infoRepository.create(res);
        try {
            await this.infoRepository.save(data);
            return {
                code: 1,
                msg: '修改成功',
                data: '',
            };
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException('修改失败', 400);
        }
    }
};
exports.InfoService = InfoService;
exports.InfoService = InfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('INFO_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], InfoService);
//# sourceMappingURL=info.service.js.map