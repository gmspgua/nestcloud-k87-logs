import { LoggerService, Injectable, Scope } from '@nestjs/common'
import { createLogger, Logger, transports, format } from 'winston'
const { combine, timestamp, label, colorize, prettyPrint, ms, printf, metadata } = format;


@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private context?: string
  private winstonLogger: Logger

  public setContext(context: string) {
    this.context = context
  }

  public setLevel(level: string) {
    this.winstonLogger.level = level
  }

  constructor() {
   const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${label} ${message}  ${timestamp}  ${level} `;
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

  log(message: any, context?: string) {
    return this.winstonLogger.info(message, { context: context || this.context })
  }

  error(message: any, trace?: string, context?: string): any {
    return this.winstonLogger.error(message, { context: context || this.context })
  }

  warn(message: any, context?: string): any {
    return this.winstonLogger.warn(message, { context: context || this.context })
  }

  debug(message: any, context?: string): any {
    return this.winstonLogger.debug(message, { context: context || this.context })
  }

  verbose(message: any, context?: string): any {
    return this.winstonLogger.verbose(message, { context: context || this.context })
  }
}