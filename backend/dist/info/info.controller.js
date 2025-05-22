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
exports.InfoController = void 0;
const common_1 = require("@nestjs/common");
const info_service_1 = require("./info.service");
let InfoController = class InfoController {
    constructor(infoService) {
        this.infoService = infoService;
    }
    async getInfoById(id) {
        return await this.infoService.getInfoById(id);
    }
    async getAllInfo() {
        return await this.infoService.getAllInfo();
    }
    async create(email, github_id, github_pj_add, project_online_add) {
        return await this.infoService.create(email, github_id, github_pj_add, project_online_add);
    }
};
exports.InfoController = InfoController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "getInfoById", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "getAllInfo", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('github_id')),
    __param(2, (0, common_1.Body)('github_pj_add')),
    __param(3, (0, common_1.Body)('project_online_add')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "create", null);
exports.InfoController = InfoController = __decorate([
    (0, common_1.Controller)('info'),
    __metadata("design:paramtypes", [info_service_1.InfoService])
], InfoController);
//# sourceMappingURL=info.controller.js.map