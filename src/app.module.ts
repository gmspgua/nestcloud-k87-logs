import { Module } from '@nestjs/common';
import { BootModule } from '@nestcloud/boot';
import { ConfigModule } from '@nestcloud/config';
import { ScheduleModule } from '@nestcloud/schedule';
import { BOOT, components, KUBERNETES } from '@nestcloud/common';
import { WinstonModule } from 'nest-winston';
import {AppLogger} from './services/logger.service';
import * as services from './services';
import { winstonConfig }  from './config/winston.config';
import { resolve } from 'path';
import { KubernetesModule } from '@nestcloud/kubernetes';
import { HttpModule } from '@nestcloud/http';
import { ProxyModule } from '@nestcloud/proxy';
import {ProxyController}from './controllers/proxy.controller';



@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
    ScheduleModule.forRoot(),
    BootModule.forRoot({ filePath: resolve(__dirname, 'config.yaml') }),
    ConfigModule.forRootAsync({ inject: [KUBERNETES, BOOT] }),
    HttpModule.forRoot(),
    ProxyModule.forRootAsync({ inject: [BOOT] }),
    KubernetesModule.forRootAsync({ inject: [BOOT] }),
  ],
  controllers: components(ProxyController),
  providers: components(services, AppLogger),
})
export class AppModule {
}
