import bcrypt from "bcrypt";
import User from "../models/User.js"; 


// userController diyebilirdik buraya.

const createUser = async (req,res) => {
    try {
     const user = await User.create(req.body);
    res.status(201).json({
        succeded: true,
        user,
     })
    
} catch (error) {
    res.status(400).json({ // 400 badrequest
        succeded : false,
        error
    }) 
    
}
}

const loginUser = async (req,res) => {
    
    try {

    const {email, password} = req.body;

    const user = await User.findOne({email});  // bizim gönderdiğimiz e-mail , veritabanındaki e-maile eşit olan kullanıcıyı bul ve al
    
    let same = false;

    if (user) { // eğer user varsa..
        same = bcrypt.compare(password,user.password) // İlk password formdan gelen, diğeri dbden. compare ediyoruz eşleşiyorsa true, eşleşmezse false döndürüyor.

    } else { // user yoksa
        return res.status(401).json( { //! Return yazdık çünkü, eğer kullanıcı yoksa alltaki iflere devam etmemesi için.
            succeded : false,
            error : "There is no such an user"
        });
    }
    if (same) { // eğer same truysa..
        res.status(200).send("You logged in");
    }
    



} catch (error) {
    res.status(400).json({ // 400 badrequest
        succeded : false,
        error,
    }) 
    
}
}

export {createUser,loginUser};