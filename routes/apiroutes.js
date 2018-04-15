const router = require("express").Router()
const usercontroller = require("../controllers/usercontroller.js")
const postcontroller = require("../controllers/postcontroller.js")


router.post("/login", usercontroller.login)

router.post("/reg", usercontroller.reg)

router.post("/createBlogpost", usercontroller.authWithRedirect, postcontroller.postblog)

//router.post("/updateBlogpost", usercontroller.authWithRedirect, postcontroller.updateblog)

router.post("/deleteBlogpost", usercontroller.authWithRedirect, postcontroller.deleteblog)


module.exports = router