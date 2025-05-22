import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { infoProviders } from './info.providers';
import { DatabaseModule } from 'src/model/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InfoController],
  providers: [...infoProviders, InfoService],
})
export class InfoModule {}
