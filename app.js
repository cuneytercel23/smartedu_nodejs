import express from "express";

const app = express();
//template engine 
app.set("view engine", "ejs") // view enginim ejs dedik.

//middlewares
app.use(express.static("public")) // statik dosyalarım public içinde olucak.

const port = 3000; 

app.get("/", (req,res)=> {
    res.status(200).render("index"); //index.ejsyi render etmek.
})

app.get("/about", (req,res)=> {
    res.status(200).render("about"); //about.ejsyi render etmek.
})
app.listen(port, () => {
    console.log(`app started on port ${port}`);
})