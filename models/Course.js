import mongoose from "mongoose";
import slugify from "slugify";

const Schema = mongoose.Schema;

const CourseSchema = new Schema ({

    name : {
        type: String,
        unique : true,
        required : true,
    },
    description : {
        type: String,
        required : true,
        trim : true
    },
    createdAt : {
         type : Date,
         default : Date.now
    },
    slug : {
        type : String,
        unique : true,
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Category" // referans vermek istediğim modelin ismi
    },

});

CourseSchema.pre("validate", function(next) { //arrow functionun thisleri olmadığı için, normal funk kullandım.
    this.slug = slugify(this.name, { //* kursun isminden faydalanarak slug oluşturdu, örneğin CSS 101 -> css-101' oluşturdu.
        lower : true,
        strict : true, // iki nokta vb şeyleri yok ediyor.
    })
    next();
})

const Course  = mongoose.model("Course", CourseSchema)

export default Course ;