import { Repository } from 'typeorm';
import { InfoEntity } from './info.entity';
export declare class InfoService {
    private readonly infoRepository;
    constructor(infoRepository: Repository<InfoEntity>);
    getInfoById(id: number): Promise<InfoEntity>;
    getAllInfo(): Promise<InfoEntity[]>;
    create(email: string, github_id: string, github_pj_add: string, project_online_add: string): Promise<{
        code: number;
        msg: string;
        data: string;
    }>;
    setInfoById(id: number, email: string, github_id: string, github_pj_add: string, project_online_add: string): Promise<{
        code: number;
        msg: string;
        data: string;
    }>;
}
