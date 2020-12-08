import { LoggerService, Injectable, Scope } from '@nestjs/common'
import { createLogger, Logger, transports, format } from 'winston'
const { combine, timestamp, label, colorize, prettyPrint, ms, printf, metadata } = format;


@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private context?: string
  private uuid?: string
  private winstonLogger: Logger

  public setContext(context: string) {
    this.context = context
  }

  private getPodName(){
    return process.env.HOSTNAME;
  }

  public setUUid(uuid: string) {
    this.uuid = uuid
  }

  public setLevel(level: string) {
    this.winstonLogger.level = level
  }

  public setLoggerOff(flag: boolean) {
    this.winstonLogger.silent = flag
  }

  constructor() {
   const myFormat = printf(({ level, message, label, timestamp, uuid }) => {
    return `${label} ${message}  ${timestamp}  ${level}  ${this.uuid} ${this.getPodName()} `;
  }); 

    this.winstonLogger = createLogger({
      format: combine(
        label({ label: 'ms-log-v1'}),
        timestamp(),
        ms(), 
        myFormat,
        prettyPrint(),
        colorize({all: true}),
      ),
      transports: [new transports.Console()]
    })
  }

  log(message: any, context?: string, uuid?: string) {
    return this.winstonLogger.info(message, { context: context || this.context, uuid: this.uuid,  podName: this.getPodName() })
  }

  error(message: any, trace?: string, context?: string): any {
    return this.winstonLogger.error(message, { context: context || this.context, uuid: this.uuid,  podName: this.getPodName() })
  }

  warn(message: any, context?: string): any {
    return this.winstonLogger.warn(message, { context: context || this.context, uuid: this.uuid,  podName: this.getPodName() })
  }

  debug(message: any, context?: string): any {
    return this.winstonLogger.debug(message, { context: context || this.context, uuid: this.uuid,  podName: this.getPodName() })
  }

  verbose(message: any, context?: string): any {
    return this.winstonLogger.verbose(message, { context: context || this.context, uuid: this.uuid,  podName: this.getPodName() })
  }
}