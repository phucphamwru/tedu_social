import { httpException } from '@core/exceptions';
import { isEmptyObject } from '@core/utils';
import { DataStoredInToken, TokenData } from '@module/auth';
import RegisterDto from './Dtos/register.dto';
import UserSchema from './users.model';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from './users.interface';
import jsonwebtoken from 'jsonwebtoken';
import { IPagination } from '@core/interfaces';
class UserService {
    public userSchema = UserSchema; //model

    public async createUser(model: RegisterDto): Promise<TokenData>{        //Promise giả về Token data.
        if (isEmptyObject(model)) {                                     //model là Object dạng Dto được client gửi đến.
            throw new httpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findOne({email: model.email}).exec();   //lấy ra user, khi so sánh email với email trong model.
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

        const hashedPassword = await bcryptjs.hash(model.password!, salt);    //mã hóa mật khẩu đầu vào.

        const createdUser: IUser = await this.userSchema.create({       //cấu hình thêm các thuộc tính trong user 
            ...model,                                  //giuỗi mảng[] ra thành các phần tử lẻ.
            password: hashedPassword,
            avatar: avatar,
            date: Date.now()
        });
        console.log(hashedPassword);
        return this.createToken(createdUser);   //giá trị trả về là token.
    }

    private createToken(user: IUser): TokenData{
        const dataInToken: DataStoredInToken = {id: user._id};  //gán id của user là mã token.
        const secret: string = process.env.JWT_TOKEN_SECRET!;   //bảo vệ mã token. 
        const expiresIn: number = 60;                           //tồn tại trong 60 giây.
        return {                                                //gửi trả về function 1 token.
            token: jsonwebtoken.sign(dataInToken, secret, {expiresIn: expiresIn})   //mã hóa token
        };
    }

    public async getUserById(userId: string): Promise<IUser>{
        const user = await this.userSchema.findById(userId).exec();
        if(!user){
            throw new httpException(404,`User is not exists.`);
        }
        
        return user;
    }

    public async updateUser(userId: string, model: RegisterDto): Promise<IUser>{        //Promise giả về IUser data.
        if (isEmptyObject(model)) {                                     //model là Object dạng Dto được client gửi lên để update data.
            throw new httpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findById(userId).exec();   //lấy ra user - khi so sánh userId với Id của Document User có trong Collections.
        
        if(!user) {         //Nếu không tồn tại user ứng với UserId truyền vào.
            throw new httpException(400, `User id is not exist`);
        }

        let avatar = user.avatar;
        if(user.email === model.email){
            throw new httpException(400, `You must using the difference email`);
        } else {
            avatar = gravatar.url(model.email!, {
                size: '200',
                rating: 'g',
                default: 'mm'
            });
        }
    
        let updateUserById;
        if(model.password){
            const salt = await bcryptjs.genSalt(10);      //để mã hóa, bảo mật.

            const hashedPassword = await bcryptjs.hash(model.password, salt);    //mã hóa mật khẩu đầu vào.

            updateUserById = await this.userSchema.findByIdAndUpdate(userId, {
                ...model,
                avatar: avatar,
                password: hashedPassword
            }).exec();
        } else {
            updateUserById = await this.userSchema.findByIdAndUpdate(userId, {
                ...model,
                avatar: avatar
            }).exec();
        }
        
        if (!updateUserById) {
            throw new httpException(409, 'You are not an user');
        }

        return updateUserById;
    }

    public async getAllUser(): Promise<IUser[]>{
        const user = await this.userSchema.find().exec();  
        return user;
    }

    // public async getAllPaging(page: number): Promise<IUser[]>{
    //     const pageSize: number = Number(process.env.PAGE_SIZE);
    //     const user = await this.userSchema.find()
    //     .skip((page-1) * pageSize)                  //skip(x): lấy từ vị trí thứ x trong db.
    //     .limit(pageSize)                            //limit(y): lấy y phần tử ra.
    //     .exec();
        
    //     return user;
    // }

    public async getAllPaging(
        keyword: string,
        page: number
        ): Promise<IPagination<IUser>> {
            const pageSize: number = Number(process.env.PAGE_SIZE || 5);

            let query = {}; // nơi lưu trữ dữ liệu lấy ra
            if (keyword) {
                query = {
                    $or: [
                    { email: keyword },
                    { first_name: keyword },
                    { last_name: keyword },
                    ]
                };
            }

            //Phân trang theo điều kiện câu query
            const users = await this.userSchema         
                .find(query)
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .exec();

            //Số lượng query thỏa mãn úng với câu query đó.
            const rowCount = await this.userSchema.find(query).countDocuments().exec();

            return {
                total: rowCount,
                page: page,
                pageSize: pageSize,
                items: users,
            } as IPagination<IUser>;
    }

    public async deleteUser(userId: string): Promise<IUser>{
        const deletedUser = await this.userSchema.findByIdAndDelete(userId).exec();
        if(!deletedUser){
            throw new httpException(404,`User is not exists.`);
        }
        
        return deletedUser;
    }
}
export default UserService;