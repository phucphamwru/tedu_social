import { NextFunction, Request, Response, response } from 'express';
import { DataStoredInToken } from '@module/auth';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');   //header nơi chứa token. x-auth-token: là biến chứa giá trị token.

    if (!token) {   //nếu không có token gửi đến.
        return res.status(401).json({ message: 'No token, authorization denied.' });    
    }
    //Check token - có khớp với user.id ?
    try {
        const user = jwt.verify(        //giải mã token
            token,
            process.env.JWT_TOKEN_SECRET ?? ''
        ) as DataStoredInToken;         //token là id của user đó ^^

        if (!req.user) {                //add thêm thuộc tính user cho req thì để ở folder types.
            req.user = { id: '' };
        } 

        req.user.id = user.id;          //gán giá trị token vào req.user.id

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authMiddleware;