import { DataSource } from 'typeorm';
import { InfoEntity } from './info.entity';

export const infoProviders = [
  {
    provide: 'INFO_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(InfoEntity);
    },
    inject: ['DATA_SOURCE'],
  },
];
