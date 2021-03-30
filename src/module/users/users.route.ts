import { Route } from '@core/interfaces'
import {validationMiddleware} from '@core/middleware';
import { Router } from 'express';
import RegisterDto from './Dtos/register.dto';
import UserController from './users.controller';

export default class UserRoute implements Route{
    public path = '/api/users';
    public router = Router();

    public userController = new UserController();

    constructor(){
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.post(this.path, validationMiddleware(RegisterDto, true), this.userController.register);   //POST: http//localhost:5000/api/users
        
        this.router.put(this.path + '/:id', validationMiddleware(RegisterDto, true), this.userController.updateUser);

        this.router.get(this.path + '/:id', this.userController.getUserById);

        this.router.get(this.path, this.userController.getAllUser);

        this.router.get(this.path + '/paging/:page', this.userController.getAllPaging);

        this.router.delete(this.path + '/:id', this.userController.deleteUser);
    }
}