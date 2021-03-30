import { TokenData } from "@module/auth";
import {Request, Response, NextFunction } from "express";
import LoginDto from "./auth.dto";
import AuthService from "./auth.service";


export default class AuthController {
    public authService = new AuthService();

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: LoginDto = req.body;
            const tokenData: TokenData = await this.authService.login(model);
            res.status(200).json(tokenData);        //gửi API về phía client - dưới dạng token.
        } catch (error) {
            next(error);    //đưa đến midlleware tiếp theo xử lý lỗi.
        }
    } 

    public getCurrentLoginUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.authService.getCurrentLoginUser(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

}