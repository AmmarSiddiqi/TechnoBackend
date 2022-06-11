import "./start/dotenv.js";
import "./start/config.js";
import express from "express";
import "./start/db.js";
import routes from "./start/routes.js";

const app = express();
app.use(express.json());

routes(app);

let port = process.env.PORT;
app.listen(port, () => console.log(`Server Started at PORT ${port}`));
