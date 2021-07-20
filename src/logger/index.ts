import config from "config";
import { format, createLogger, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const alignedWithColors = format.combine(
    format.colorize({ level: true }),
    format.printf(info => `${info.level}: ${info.message}`)
);

const alignedWithTime = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const fileTransport = new DailyRotateFile({
    maxFiles: '14d',
    zippedArchive: false,
    datePattern: 'YYYY-MM-DD',
    filename: `${config.get('log.logDir')}/PROXY-%DATE%.log`,
    level: config.get('log.fileLevel'),
    json: false,
    format: alignedWithTime,
});

const consoleTransport = new transports.Console({
    level: config.get('log.consoleLevel'),
    format: alignedWithColors,
});

const logger = createLogger({
    level: 'debug',
    transports: [
        fileTransport,
        consoleTransport,
    ],
});

export default logger;