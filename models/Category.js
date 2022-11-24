import mongoose from "mongoose";
import slugify from "slugify";
const Schema = mongoose.Schema;

const CategorySchema = new Schema ({

    name : {
        type: String,
        unique : true,
        required : true,
    },

    slug : {
        type : String,
        unique : true,
    }

});

CategorySchema.pre("validate", function(next) { //arrow functionun thisleri olmadığı için, normal funk kullandım.
    this.slug = slugify(this.name, { //* kursun isminden faydalanarak slug oluşturdu, örneğin CSS 101 -> css-101' oluşturdu.
        lower : true,
        strict : true, // iki nokta vb şeyleri yok ediyor.
    })
    next();
})

const Category  = mongoose.model("Category", CategorySchema)

export default Category ;