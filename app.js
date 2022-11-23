import express from "express";

const app = express();
const port = 3000; 

app.get("/", (req,res)=> {
    res.send("mainpage");
})

app.listen(port, () => {
    console.log(`app started on port ${port}`);
})