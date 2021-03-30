require('dotenv').config();

import App from "./app";
import { validateEnv } from "@core/utils"
import { IndexRoute } from "@module/index";
import { UserRoute } from "@module/users";
import { AuthRoute } from "@module/auth";

validateEnv();

const routes = [new IndexRoute(), new UserRoute(), new AuthRoute()];

const app = new App(routes);

app.listen();