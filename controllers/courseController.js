import Category from "../models/Category.js";
import Course from "../models/Course.js";

const createCourse = async (req,res) => {
    try {

     const course = await Course.create(req.body);
     

    res.status(201).json({
        succeded: true,
        course
     })
    
} catch (error) {
    res.status(400).json({ // 400 badrequest
        succeded : false,
        error
    }) 
    
}
}

const getAllCourses = async (req,res) => {
    try {
        const categorySlug = req.query.categories; //localhost:3000/courses?categories=blabla //! Şimdi req.query kullanınca (key,value) olur , req.params da sadece value olur. categories yazdığım kısım urlde ne diye çekmek istersek oluyor, eğer cate yazıp postmana de cate yazarsam gene aynı şeyi alıyorum. // Senaryo 1-) frontendde proggraming alanı var ve ona basınca localhost:3000/courses?categories=programming kısmına gidiyoruz. bu kod ile  programming yazısını alıyoruz, 

        const category = await Category.findOne({slug: categorySlug}); //slugı örneğin localhost:3000/courses?categories=programming ' in slugu = programmingdir. Neyse, db de slugu, categorySlug olanı bul ve al. //! Senaryo 2-) Burda dbde slugu programming olan categoriyi buluyoruz, oda Proggraming kategorisi zaten.

        let filter = {}

        if (categorySlug) { // eğer categorySlug varsa 
            filter = { category : category._id}  //Soldaki category, course modelinden geliyor , sağdaki yukarda bulduğumuz findone ile bulduğumuz category. sol ve sağ eşit olduğu zaman bu sıralamayı yapacaksın diyoruz. //! Senaryo3-) Soldaki Course kısmındaki category ve type'ı = object.id , sağdaki de yukarda bizim bulduğumuz category(categorydatabesinden), ve soldakinin sağdakine eşit olduğu durumları çekmek için bu filteri senaryo 4e koyuyoruz.
        }

     const courses = await Course.find(filter); //! Senaryo 4 
     const categories = await Category.find(); // Projede kurs sayfasında, kategoriler gözüktüğü için bunuda aldık burada.
    res.status(201).json( {
        courses,
        categories
    })
    
} catch (error) {
    res.status(400).json({ // 400 badrequest
        succeded : false,
        error
    }) 
    
}
}
const getACourse = async (req,res) => {
    try {

     const course = await Course.findById({slug: req.params.slug}); // {_id : req.params.id} diyoduk normalde, slugify kullandık, buarada req.params.id = urldeki id , req.params.slug = urldeki slug.
    res.status(201).render("courses", {
        course,
    })
    
} catch (error) {
    res.status(400).json({ // 400 badrequest
        succeded : false,
        error
    }) 
    
}
}

export { createCourse, getAllCourses, getACourse}; 