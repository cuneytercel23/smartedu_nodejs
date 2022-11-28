import nodemailer from "nodemailer";

const getAboutpage = (req,res) => {
    res.status(200).render("about"); //about.ejsyi render etmek.
}

const getIndexPage = (req,res) => {
    res.status(200).render("index"); //index.ejs render etmek.
}

const getRegisterPage = (req,res) => {
    res.status(200).render("register"); //register.ejs render etmek.
}

const getLoginPage = (req,res) => {
    res.status(200).render("login"); //register.ejs render etmek.
}
const getContactPage = (req,res) => {
    res.status(200).render("contact"); //register.ejs render etmek.
}

// req.body den sonraları kendi kafamıza göre veriyoruz, name yerine kitap desemde post ederken body kısımına kitap yazsam oluyor.
const sendMail = async(req,res) => {
    const  outputMessage = `
    <h1>Mail Details</h1>
    <ul>
    <li>Name : ${req.body.name}</li>
    <li>Email : ${req.body.email}</li>
    <ul>
    <h1>Mail Details</h1>
    <p>Name : ${req.body.password}</p>
    `
//* Güvenlik sebeplerinden ötürü, bilgilerimi girmiyorum :DDD
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "kendimail@gmail.com", // generated ethereal user
          pass: "kendişifrem123", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"SMART EDU CONTACT FORM", kendimail@gmail.com', // sender address
        to: "ce@gmail.com", // list of receivers
        subject: "SMART EDU CONTACT FORM NEW MESSAGE ✔", // Subject line
        html: outputMessage, // html body
      });
}

export {getAboutpage, getIndexPage, getRegisterPage, getLoginPage, getContactPage,sendMail}