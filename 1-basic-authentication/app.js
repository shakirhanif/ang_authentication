import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import route from "./routes/routes.js";
import connection from "./database/db.js";
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", route);

connection();
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`server runing at ${PORT}`);
});
