import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;


const UserSchema = new Schema ({

    name : {
        type: String,
        required : true,
        trim : true
    },
    
    email : {
        type: String,
        unique : true,
        required : true,
        trim: true
    },

    password : {
        type : String,
        required : true,
        trim : true,
         
    }

});

// Şifre hashleme
UserSchema.pre("save", function(next) {
    const user = this;
    bcrypt.hash(user.password, 10 , (err, hash) => { // Burda encrypte ediyoruz.
        user.password = hash; // burda da encrypte ettiğimizi kaydediyoruz.
        next();
    });

})

const User = mongoose.model("User", UserSchema);

export default User ;