import { InfoService } from './info.service';
export declare class InfoController {
    private readonly infoService;
    constructor(infoService: InfoService);
    getInfoById(id: number): Promise<import("./info.entity").InfoEntity>;
    getAllInfo(): Promise<import("./info.entity").InfoEntity[]>;
    create(email: string, github_id: string, github_pj_add: string, project_online_add: string): Promise<{
        code: number;
        msg: string;
        data: string;
    }>;
}
