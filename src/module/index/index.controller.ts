import {Request, Response, NextFunction } from "express";

export default class IndexCotroller {
    public index = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).send("API is running ahihi...");
        } catch (error) {
            next(error);    //đưa đến midlleware tiếp theo xử lý lỗi.
        }
    } 
}