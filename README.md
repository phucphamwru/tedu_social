# social network for TEDU Community

## Technologies stack

- NodeJS
- MongoDB
- Express
- Typescript

## command remembers

## Lession 9
- Open terminal command windows: ctrl + `
- npm init or yarn init
- git init
- git commit -m "Initial commit"

- git config --global user.name "Phuc Pham"
- git config --global user.email "phucpv62@wru.vn"

- git remote add origin https://github.com/phucphamwru/tedu_social
- git remote -v
- git remote show origin
- git push -u origin master

### Lession 10
- tsc --init
- Reference:
    "target": "es6",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./", 
    "moduleResolution": "node",
    "baseUrl": "./src",
    "experimentalDecorators": true,


### Lession 11
- Tạo thư  mục 'src'
- Tạo file 'server.ts' nằm trong thư mục 'src'

- yarn add express                  => cài express và đặt trong dependeci
- yarn add @type/express --dev      => đặt trong devDependenci

(trong file src/server.js)
import express from 'express';
const port = process.env.POST || 5000;
const app = express();              => kiểu của app là 1 class tên express.

app.get('/', (req: Request, res: Response) => {
    res.send('API is running ...');
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

- yarn add typescript nodemon ts-code --dev
+ nodemon: reload server 
+ ts-code: chạy trực tiếp file ts
+ --dev : chỉ cài trên môi trường develop

- Cài Postman => để test API.

"scripts": {
    ... ,
    "server": "nodemon src/server.ts"
}


### Lession 14
Cài đặt biến môi trường.
- dotenv: npm install dotenv
- cross-env: hỗ trợ nhiều môi trường 1 lúc.
    npm install --save-dev cross-env
- .env: chứa các thành phần ẩn, không public ra ngoài.
    (link kết nối database, ...)
- Kiểm tra sự tồn tại của connectString - biến chứa link kết nối đến Database.


### Lession 15
Cài đặt package cho middlewear
- HPP: bảo vệ những cuộc tấn công qua chống lại parameter HTTP.
- Helmet: cài thêm các thành phần bảo mật = các HTTP headers khác nhau.
- Morgan: dùng cho Logger. (kiểu in console.log)
- cros: bên trung gian - cho phép những thành phần client nào thỏa mãn mới được vào.
- winston: ghi log - màu mè cho đẹp.

Nhúng vào app() khi khởi chạy chương trình ở môi trường 'production'.
    +) Nếu ở môi trường 'production thì mới nhúng vào.
    +) Nếu ở môi trường 'develop' thì không cần nhúng.


### Lession 16
Validate cho các biến môi trường.
- envalid: để validate các biến môi trường.


### Lession 17
Khai báo module trong typescript.
- Thay toàn bộ đường dân thông thường:
    +) dấu * ám chỉ đến tất cả các folder, các file trong 1 folder.
    +) @core : đường dần đến thư mục core.
    +) @module: đường dẫn đến thư mục module.
- Cài đặt tsconfig-paths : để tải các mô-đun có vị trí được chỉ định trong phần đường dẫn.
    "exec": "ts-node -r tsconfig-paths/register"


### Lession 18
Handle error middleware.
- tạo thư mục Exceptions -> để chứa các exception dùng chung.
- tạo thư mục Middleware -> để chứa các middleware.


### Lession 19
Ghi Log và Combie.


### Lession 20
Debug
Tạo .vscode và định nghĩa launch.json -> khu vực debug.
Debug -> Node: Nodem -> Pick ts-config. 


### Lession 21
Tạo UserSchema với Mongoose
- Tạo module Users : index, route, controller, service, model, interface.
- gravarta: nơi để lưu trữ ảnh trên internet.
- Mongoose khai báo module dùng schema...



### Lession 22
(tiếp với 21)
- Tạo Service: 
- Tạo Dto -> để validate dễ dàng hơn.
- Utlis/helper.js để kiểm tra Object có thực sự tồn tại.
- Thư viện bcryptjs -> để mã hóa, và giải mã trong nodejs.
- auth? Dtos?
- cài thêm các thư viện: bcryptjs, jsonwebtoken, gravatar
    + bcryptjs: để mã hóa.
    + gravatar: nơi chứa đường dẫn ảnh (image).
    + jsonwebtoken: để chứa token.


Trong service:
	- gọi DbModel.
		+ gọi ra để tham chiếu.

	- tạo token.
		+ tạo token cho user -> để service trả về.

	- tạo user:
		+ Kiểm tra model.
		+ Kiểm tra user có tồn tại trong model.
		+ Cấu trúc cho các biến cần thêm vào trong thuộc tính user.
		+ giá trị trả về là token.