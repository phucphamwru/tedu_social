import { httpException } from '@core/exceptions';
import { isEmptyObject, Logger } from '@core/utils';
import { DataStoredInToken, TokenData } from '@module/auth';
import { UserSchema, IUser } from '@module/users';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import LoginDto from './auth.dto';
class AuthService {
    public userSchema = UserSchema; //model

    public async login(model: LoginDto): Promise<TokenData>{        //Promise giả về Token data.
        if (isEmptyObject(model)) {                                     //model là Object dạng Dto được client gửi đến.
            throw new httpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findOne({email: model.email}).exec();   //lấy ra user, khi so sánh email với email trong model.
        if(!user) {
            throw new httpException(409, `Your email ${model.email} already exist.`);
        }
    
       
        const isMatchPassword = await bcryptjs.compare(
            model.password,
            user.password
        );
        if (!isMatchPassword){
            throw new httpException(400, 'Credential is not valid');
        }

        return this.createToken(user);   //giá trị trả về là token.
    }

    private createToken(user: IUser): TokenData{
        const dataInToken: DataStoredInToken = {id: user._id};  //gán id của user là mã token.
        const secret: string = process.env.JWT_TOKEN_SECRET!;   //bảo vệ mã token.
        const expiresIn: number = 60;                           //60s
        return {                                                //gửi trả về function 1 token.
            token: jsonwebtoken.sign(dataInToken, secret, {expiresIn: expiresIn})
        };
    }

    public async getCurrentLoginUser(userId: string): Promise<IUser> {
        const user = await this.userSchema.findById(userId).exec();
        if (!user) {
            throw new httpException(404, `User is not exists`);
        }
        return user;
    }    
}

export default AuthService;