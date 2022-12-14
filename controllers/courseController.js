import Category from "../models/Category.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

const createCourse = async (req,res) => {
    try {

     const course = await Course.create({
        name : req.body.name, //kurs ismini req bodyden al
        description : req.body.description, // kurs acıklamasını req.bodyden al
        category : req.body.category, // kategoriyi de reqbodyden al
        user : req.session.userID, //! Kullanıcıyı ise sessiondaki userID'den al , bunu yapma sebebimiz course create eden hocayı almamız çünkü alıp yazdırıcaz bunu bu hoca oluşturdu diye.

     });
     

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
            filter = { category : category._id}  //Soldaki category, course modelinden geliyor , sağdaki yukarda bulduğumuz findone ile bulduğumuz category. sol ve sağ eşit olduğu zaman bu sıralamayı yapacaksın diyoruz. //! Senaryo 3-) Soldaki Course kısmındaki category ve type'ı = object.id , sağdaki de yukarda bizim bulduğumuz category(categorydatabesinden), ve soldakinin sağdakine eşit olduğu durumları çekmek için bu filteri senaryo 4e koyuyoruz.
        }

     const courses = await Course.find(filter).sort('-createdAt'); //! Senaryo 4 , createdAte göre sırala dedik, en son gelenin ilk gelmesi içinde başına - koyduk.
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

     const course = await Course.findOne({slug: req.params.slug}); // {_id : req.params.id} diyoduk normalde, slugify kullandık, buarada req.params.id = urldeki id , req.params.slug = urldeki slug.  Örneğin  //localhost/courses/java-101(Java 101 ders adı olan)
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


const enrollCourse = async (req,res) => { //Kursa kayıt oluyoruz , güya front endde göstercez.

    try {
        const user = await User.findById(req.session.userID); // Şimdi oturumda olan  kullancıyı al,
        user.courses.push({ _id: req.body.course_id }); // yukarda aldığımız kullanıcının , modelinin içindeki courses'in içerisine, _id'si  , req.body.course_id ' den gelen id ile eşleşen course' u userın içine push et. //course_id yi biz kendimiz verdik, yani post ederken /courses/enroll kısmının bodysinin içine "course_id": "637f8c83687f9fbd79086139" yazıyoruz. 
        user.save();

    res.status(201).json({
        user,
    })
    
} catch (error) {
    res.status(400).json({ // 400 badrequest
        succeded : false,
        error
    }) 
    
}
}

const releaseCourse = async (req,res) => { //Kayıt olduğumuz kurstan cıkıyoruz. , güya front endde göstercez.

    try {
        const user = await User.findById(req.session.userID); // Şimdi oturumda olan  kullancıyı al,
        user.courses.pull({ _id: req.body.course_id }); //enrolldaki pushun pull hali. 
        user.save();

    res.status(201).json({
        user,
    })
    
} catch (error) {
    res.status(400).json({ // 400 badrequest
        succeded : false,
        error
    }) 
    
}
}

const deleteCourse = async (req, res) => {
    try {    
  
      const course = await Course.findOneAndRemove({slug:req.params.slug}) // {_id : req.params.id} diyoduk normalde, slugify kullandık, buarada req.params.id = urldeki id , req.params.slug = urldeki slug. Örneğin  //localhost/courses/java-101(Java 101 ders adı olan)
  
      res.status(200).json({
        message : "Course has been deleted"
      })
  
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };

  const updateCourse = async (req, res) => {
    try {    
  
      const course = await Course.findOne({slug:req.params.slug});
      course.name = req.body.name;
      course.description = req.body.description;
      course.category = req.body.category;
  
      course.save();
  
      res.status(200).json({
        message : "Success",
        course
      })
  
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };

export { createCourse, getAllCourses, getACourse,enrollCourse, releaseCourse, deleteCourse, updateCourse}; 