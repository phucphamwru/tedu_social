import winston from 'winston';                          //winston giúp cho dạng log màu mè đẹp hơn.

const Logger: winston.Logger = winston.createLogger({
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],                                                     //thay đổi console
  format: winston.format.combine(                       //format lại màu.
    winston.format.colorize({ all: true }),
    winston.format.simple()
  ),
});
if (process.env.NODE_ENV === 'development') {
  Logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
export default Logger;