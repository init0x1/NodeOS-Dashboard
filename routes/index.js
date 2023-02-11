const {Router} = require("../utils/core/Router.js")
const {notFound} = require("../controllers/notfound.js")
const {welcomeMessage} = require('../controllers/welcomemessage.js')
const {osRouter} = require('./os.router.js')
const router = new Router()

router.get('/',welcomeMessage)
router.use(osRouter)
router.all("/*",notFound)

module.exports={router}