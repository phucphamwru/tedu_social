//Nhiệm vụ file này là lấy dữ liệu -> kiểm tra và ghi log.
//Các lỗi sai sẽ đc vứt về file này để hiển thị ra ngoài màn hình.

import { httpException } from "@core/exceptions";
import { Logger } from "@core/utils";
import { NextFunction, Request, Response } from "express";

const errorMiddleware = (error: httpException, req: Request, res: Response, next: NextFunction) => {
    const status: number = error.status || 500;
    const message: string = error.message || "Some thing when wrong";

    Logger.error(`[ERROR] - Status: ${status} - Message: ${message}`);
    res.status(status).json({message: message});
};

export default errorMiddleware;