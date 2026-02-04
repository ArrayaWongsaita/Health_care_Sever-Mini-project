import winston from 'winston';
import { env } from '../config/env.config.js';
import path from 'path';

const logDir = env.LOG_DIR || 'logs';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

/* ---------------- CONSOLE FORMAT (Human) ---------------- */
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

/* ---------------- FILE FORMAT (Machine) ---------------- */
const fileFormat = combine(timestamp(), errors({ stack: true }), json());

export const logger = winston.createLogger({
  level: env.NODE_ENV === 'development' ? 'debug' : env.NODE_ENV === 'test' ? 'silent' : 'info',

  transports: [
    //  Console (dev / prod)
    new winston.transports.Console({
      format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), consoleFormat),
    }),

    //  App log
    new winston.transports.File({
      filename: path.join(logDir, 'app.log'),
      format: fileFormat,
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),

    // ❌ Error log
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: fileFormat,
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],

  //  uncaught / unhandled
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'exceptions.log'),
    }),
  ],

  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'rejections.log'),
    }),
  ],
});
