import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/routesPage.js";
import courseRoute  from "./routes/courseRoute.js";
import categoryRoute from "./routes/categoryRoute.js"
import userRoute from "./routes/userRoute.js"


const app = express();

//dotenv
dotenv.config();

// connect db
conn();

//template engine 
app.set("view engine", "ejs") // view enginim ejs dedik.

//middlewares
app.use(express.static("public")) // statik dosyalarım public içinde olucak.
app.use(express.json());
app.use(express.urlencoded({extended : true}))

const port = 3000; 

//Route
app.use("/",pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);



app.listen(port, () => {
    console.log(`app started on port ${port}`);
})