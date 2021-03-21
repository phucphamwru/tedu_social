import winston from 'winston';                          //winston giúp cho dạng log màu mè đẹp hơn.

const Logger: winston.Logger = winston.createLogger({
  transports: [new winston.transports.Console()],       //thay đổi console
  format: winston.format.combine(                       //format lại màu.
    winston.format.colorize({ all: true }),
    winston.format.simple()
  ),
});

export default Logger;