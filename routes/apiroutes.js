const router = require("express").Router()
const usercontroller = require("../controllers/usercontroller.js")
const postcontroller = require("../controllers/postcontroller.js")
const textcontroller = require("../controllers/textcontroller.js")
const trellocontroller = require("../controllers/trellocontroller.js")

router.post("/login", usercontroller.login)

// router.post("/reg", usercontroller.reg)

router.post("/createBlogpost", usercontroller.authWithRedirect, postcontroller.postblog)

router.post("/updateBlogpost", usercontroller.authWithRedirect, postcontroller.updateblog)

router.post("/deleteBlogpost", usercontroller.authWithRedirect, postcontroller.deleteblog)

router.post("/createText", usercontroller.authWithRedirect, textcontroller.createText)

router.post("/updateText", usercontroller.authWithRedirect, textcontroller.updateText)

router.post("/deleteText", usercontroller.authWithRedirect, textcontroller.deleteText)

router.post("/createTable", usercontroller.authJWT, trellocontroller.createTable)

router.post("/deleteTable", usercontroller.authJWT, trellocontroller.deleteTable)

router.get("/getTables", trellocontroller.getTable)

module.exports = router