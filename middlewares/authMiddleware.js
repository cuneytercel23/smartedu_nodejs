import User from "../models/User.js";

const checkUser = (req,res,next) => {
   const user = User.findById(req.session.userID, (err,user) => {
    if (err || !user) return res.json({ message : " you need to login bro"})
   })
   next();
}

export { checkUser};