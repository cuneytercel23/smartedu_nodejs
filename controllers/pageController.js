
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

export {getAboutpage, getIndexPage, getRegisterPage, getLoginPage}