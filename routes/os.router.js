const { Router } = require("../utils/core/Router");
const { getSysInfo } = require("../controllers/os/sysinfo");
const {terminal} = require("../controllers/os/terminal.js")
const osRouter = new Router();

osRouter.get("/os/info", getSysInfo);
osRouter.get("/os/terminal", terminal);
module.exports = { osRouter };
