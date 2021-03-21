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
- dotenv: npm install dotenv
- cross-env: hỗ trợ nhiều môi trường 1 lúc.
    npm install --save-dev cross-env
- .env: chứa các thành phần ẩn, không public ra ngoài.
    (link kết nối database, ...)