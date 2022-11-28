import bcrypt from "bcrypt";
import User from "../models/User.js"; 
import Category from "../models/Category.js"
import Course from "../models/Course.js";


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
        
        //*user session 
        req.session.userID = user._id //!userID yi biz verdik ve session içine userID oluşturmuş olduk. Eğer, şifreler eşlenmişse , sessiona koyduğumuz userID'ye , yukarıdaki veritabanından çektiğimiz userın _id sine eşitle. ve app.js de de 
        res.status(200).send("You logged in")
    }


} catch (error) {
    res.status(400).json({ // 400 badrequest
        succeded : false,
        error,
    }) 
    
}
}

const logoutUser = (req,res) => {
    req.session.destroy(); // session destroy
    res.send("you are logged out");
}

const getDashboardPage = async(req,res) => {
    
    const user = await User.findOne({_id:req.session.userID});  //! databasedeki user kısmında olan kullanıcının idsi, req.session.userID' ye eşit olanı yani login olanı al
    const categories = await Category.find();
    const courses = await Course.find({user: req.session.userID}) // Bana kursun içindeki parametrelerden biri olan userı(soldaki, nodejs dersini ronaldo yaptı onun idsi var mesela), o an giriş yapan userIDye (req.session.userID) eşit olan kursu bul getir. // bunuda yapma sebebimiz ronaldonun dashboard pageinde kendi oluşturduğu dersi görebilmesi.

    res.status(200).json({
        message : `welcome to the dashboard ${user.name}`,
        user,
        categories,
        courses,
    })
    
}


const deleteUser = async (req, res) => {
    try {    
  
      await User.findByIdAndRemove(req.params.id) // idsi urldeki olan kullancıyı bul sil
      await Course.deleteMany({user:req.params.id}) // tüm courselarını da sil onun :D
  
      res.status(200).redirect('/users/dashboard');
  
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };

export {createUser,loginUser, logoutUser, getDashboardPage, deleteUser,};