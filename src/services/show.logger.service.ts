import { Injectable, Inject } from '@nestjs/common';
import { Interval } from '@nestcloud/schedule';
import { ConfigValue } from '@nestcloud/config';
import { AppLogger } from './logger.service'
import { clearTimeout, setTimeout } from 'timers';



@Injectable()
export class ShowLoggerService {

  @ConfigValue('logger.silent', false)
  private readonly disableLog: boolean;

  @ConfigValue('logger.level', 'error')
  private readonly configMapData: string;

  private readonly  correlationId = "123e4567-e89b-12d3-a456-426655440000";

  public constructor(private logger: AppLogger){
      this.logger.setContext(ShowLoggerService.name)
      this.logger.setUUid(this.correlationId)
      this.logger.setLevel(this.configMapData);
      this.logger.setLoggerOff(this.disableLog);
     }
  
  //@Interval(1000)
  async intervalConsulConfigJob(uuid) {
   // this.logger.setLevel(this.configMapData);
   // this.logger.setLoggerOff(this.disableLog);

    this.logger.error(uuid);
    await this.sleep(5000);
    this.logger.warn( uuid);
    await this.sleep(5000);
    this.logger.log(uuid);
    await this.sleep(5000);
    this.logger.debug( uuid);
    await this.sleep(5000);
  
  }
   sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   


 // @Interval(1000)
  intervalConsulConfigJobHttp(level: string, uuid: string) {
    this.logger.setLevel(level);
   this.intervalConsulConfigJob(uuid);
     
  }

}
