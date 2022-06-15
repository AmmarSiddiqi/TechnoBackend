import "./start/dotenv.js";
import "./start/config.js";
import express from "express";
import "./start/db.js";
import routes from "./start/routes.js";

const app = express();
app.use(express.json());

// process.on("uncaughtException", function (err) {
//   console.log("Caught exception: ", err);
// });

// setTimeout(function () {
//   console.log("This will still run.");
// }, 500);

// // Intentionally cause an exception, but don't catch it.
// // nonexistentFunc();
// console.log("This will not run.");

routes(app);

let port = process.env.PORT;
app.listen(port, () => console.log(`Server Started at PORT ${port}`));
