import express from "express";
import { Route } from "@core/interfaces";
import mongoose from "mongoose";

import hpp from "hpp";
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { Logger } from "@core/utils";
import { errorMiddleware } from "@core/middleware";

class App {
    public app: express.Application;
    public port: string | number;
    public production : boolean;

    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.production = process.env.NODE_ENV == 'production' ? true : false;

        
        this.connectToDatabase();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorMiddleware();
    }

    public listen() {
        this.app.listen(this.port, ()=>{
            Logger.info(`Server is listening on port ${this.port}`);    //Logger.info <=> console.log
        });
    }

    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use("/", route.router);
        });
    }

    private connectToDatabase() {
        const connectString = process.env.MONGODB_URI;
        if (!connectString) {
            Logger.error("Connection string in invalid");
            return;
        }
        mongoose
            .connect(connectString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            })
            .catch((reason) => {
                Logger.error(reason);
            });
    
        Logger.info('Database connected...');
    }

    private initializeMiddleware() {
        if(this.production) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan('combined'));
            this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
        } else {
            this.app.use(morgan('dev'));
            this.app.use(cors({ origin: true, credentials: true }));
        }

        
        this.app.use(express.json());       //nhận dữ liệu dạng JSON
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeErrorMiddleware() {
        this.app.use(errorMiddleware);
    }
}

export default App;