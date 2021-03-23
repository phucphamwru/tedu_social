import { httpException } from '@core/exceptions';
import { isEmptyObject } from '@core/utils';
import { DataStoredInToken, TokenData } from '@module/auth';
import RegisterDto from './Dtos/register.dto';
import UserSchema from './users.model';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from './users.interface';
import jsonwebtoken from 'jsonwebtoken';
class UserService {
    public userSchema = UserSchema; //model

    public async createUser(model: RegisterDto): Promise<TokenData>{        //Promise giả về Token data.
        if (isEmptyObject(model)) {
            throw new httpException(400, 'Model is empty');
        }

        const user =  this.userSchema.findOne({email: model.email});   //lấy ra user, khi so sánh email với email trong model.
        if(user) {
            throw new httpException(409, `Your email ${model.email} already exist.`);
        }
    
        // Cấu trúc cho các biến cần thêm vào trong thuộc tính user.
        const avatar = gravatar.url(model.email!, {      //cấu trúc avarta. dấu ! để cho biết model.email ko thể empty đc.
            size: '200',
            rating: 'g',
            default:  'mm'
        });

        const salt = await bcryptjs.genSalt(10);      //để mã hóa, bảo mật.

        const hashedPassword = bcryptjs.hash(model.password!, salt);    //mã hóa mật khẩu đầu vào.

        const createdUser: IUser = await this.userSchema.create({       //cấu hình thêm các thuộc tính trong user 
            ...model,                                  //giuỗi mảng[] ra thành các phần tử lẻ.
            password: hashedPassword,
            avatar: avatar,
            date: Date.now()
        });

        return this.createToken(createdUser);   //giá trị trả về là token.
    }

    private createToken(user: IUser): TokenData{
        const dataInToken: DataStoredInToken = {id: user._id};  //gán id của user là mã token.
        const secret: string = process.env.JWT_TOKEN_SECRET!;   //bảo vệ mã token.
        const expiresIn: number = 60;                           //60s
        return {                                                //gửi trả về function 1 token.
            token: jsonwebtoken.sign(dataInToken, secret, {expiresIn: expiresIn})
        };
    }
}

export default UserService;