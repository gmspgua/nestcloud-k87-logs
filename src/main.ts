import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BOOT, IBoot } from '@nestcloud/common';

import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';




async function bootstrap() {

  const logger = WinstonModule.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, {logger});

  process.on('SIGINT', async () => {
    setTimeout(() => process.exit(1), 5000);
    await app.close();
    process.exit(0);
  });

  // kill -15
  process.on('SIGTERM', async () => {
    setTimeout(() => process.exit(1), 5000);
    await app.close();
    process.exit(0);
  });

  const boot = app.get<IBoot>(BOOT);
  await app.listen(boot.get('service.port', 3200));
}

bootstrap();
