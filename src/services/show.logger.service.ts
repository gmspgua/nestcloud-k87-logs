import { Injectable, Inject } from '@nestjs/common';
import { Interval } from '@nestcloud/schedule';
import { ConfigValue } from '@nestcloud/config';
import { AppLogger } from './logger.service'


@Injectable()
export class ShowLoggerService {

  @ConfigValue('logger.silent', false)
  private readonly disableLog: boolean;

  @ConfigValue('logger.level', 'error')
  private readonly configMapData: string;

  public constructor(private logger: AppLogger){
      this.logger.setContext(ShowLoggerService.name)
      this.logger.setLevel(this.configMapData);
     }
  
  @Interval(2000)
  intervalConsulConfigJob() {
    this.logger.setLevel(this.configMapData);

    this.logger.error('Flamengo' );
    this.logger.warn('Brasiliense' );
    this.logger.log('Palmeiras' );
    this.logger.debug('Sao Paulo');
  }
}
