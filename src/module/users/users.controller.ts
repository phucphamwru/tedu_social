import { TokenData } from "@module/auth";
import {Request, Response, NextFunction } from "express";
import RegisterDto from "./Dtos/register.dto";
import UserService from "./users.service";

export default class UserController {
    public userService = new UserService();

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: RegisterDto = req.body;
            const tokenData: TokenData = await this.userService.createUser(model);
            res.status(201).json(tokenData);        //gửi API về phía client - dưới dạng token.
        } catch (error) {
            next(error);    //đưa đến midlleware tiếp theo xử lý lỗi.
        }
    } 

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const user = await this.userService.getUserById(userId);
            res.status(200).json(user);        //gửi API về phía client - dưới dạng token.
        } catch (error) {
            next(error);    //đưa đến midlleware tiếp theo xử lý lỗi.
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const model: RegisterDto = req.body;
            const user = await this.userService.updateUser(userId, model);
            res.status(200).json(user);        //gửi API về phía client - dưới dạng token.
        } catch (error) {
            next(error);    //đưa đến midlleware tiếp theo xử lý lỗi.
        }
    }

    public getAllUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAllUser();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    public getAllPaging = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const page: number = Number(req.params.page);
          const keyword = req.query.keyword || '';
    
          const paginationResult = await this.userService.getAllPaging(
            keyword.toString(),
            page
          );
          res.status(200).json(paginationResult);
        } catch (error) {
          next(error);
        }
      };

    public deleteUser  = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const resultDelete = await this.userService.deleteUser(userId);
            res.status(200).json(resultDelete);        //gửi API về phía client - dưới dạng token.
        } catch (error) {
            next(error);    //đưa đến midlleware tiếp theo xử lý lỗi.
        }
    }
}