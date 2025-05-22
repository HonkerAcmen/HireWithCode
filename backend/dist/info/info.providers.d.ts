import { DataSource } from 'typeorm';
import { InfoEntity } from './info.entity';
export declare const infoProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<InfoEntity>;
    inject: string[];
}[];
