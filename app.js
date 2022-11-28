import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import routesPage from "./routes/routesPage.js";
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
//Session middleware başlatma gibi bişi artık neyse :D // bu sessionı da mongodb de saklıyoruz ve bu projede giriş yapan kullanıcının idsini burada saklıyoruz.
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI}),
  }))

const port = 3000; 

//* global variable
global.userIN = null ; 

//Route //Burası front end için eğer userIN'se falan şunu göster bunu göster yapıyoruz.
app.use("*", (req,res,next) => { //Her sayfada userIN'e req.session.userID veriyoruz. sonra next diyoruz.
    userIN = req.session.userID //! Normalde null olan userIN, birisi login olunca req.session.userID değeri geldiği için, trueya yani o gelen ıdye eşitleniyor. Frontendde eğer id varsa, şunu göster yoksa bunu göster yapıyor.   
    console.log(req.session.userID); // Login olanın idsine bakmak için yazdım
    next();
})
app.use("/",routesPage);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);



app.listen(port, () => {
    console.log(`app started on port ${port}`);
})