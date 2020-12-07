

import {
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';


export const winstonConfig = {
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console({
      silent: false,
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
  ],
};



