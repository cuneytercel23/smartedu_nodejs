import User from "../models/User.js";

const checkRoles = (roles) => {
    return  async(req,res,next) => {
        const user = await User.findOne({_id:req.session.userID}); // oturumda olan herifi aldık.
        const userRole = user.role;

        if (roles.includes(userRole)) { //! Eğer parametre olarak aldığımız role(örneğin create course için admin ve teacher diyeceğiz), userdan gelen rolü içeriyosa next diyip geçiyoruz. yani izin veriyoruz.
            next(); 
        } else { // eğer içermiyorsa senin buna iznin yok bro diyoruz.
            return res.status(401).json({
                message : "You dont have permission to do this process."
            })
        }
    }
}

export {checkRoles};



//? Eski hali buydu, hoca frontendle gittiği için, farklı yaptı bişileri bende postmanda böyle olunca öğretmenle bile giremedim, o yüzden üstteki gibi değiştrdim oldu.
// const checkRoles = (roles) => {
    //     return (req,res,next) => {
    //         const user = await User.findOne({_id:req.session.userID});
    //         const userRole = req.body.role //bodyden gelen rolü aldık.
    
    //         if (roles.includes(userRole)) { //! Eğer parametre olarak aldığımız role(örneğin create course için admin ve teacher diyeceğiz), bodyden gelen rolü içeriyosa(bodye öğretmen girdik mesela ) next diyip geçiyoruz. yani izin veriyoruz.
    //             next(); 
    //         } else { // eğer içermiyorsa senin buna iznin yok bro diyoruz.
    //             return res.status(401).json({
    //                 message : "You dont have permission to do this process."
    //             })
    //         }
    
    //     }
    
    
    
    // }