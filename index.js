import "./start/dotenv.js";
import "./start/config.js";
import cors from "cors";
import express from "express";
import routes from "./start/routes.js";
import "./start/db.js";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

routes(app);

let port = process.env.PORT;
app.listen(port, () => console.log(`Server Started at PORT ${port}`));
