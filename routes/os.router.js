const { Router } = require("../utils/core/Router");
const { getSysInfo } = require("../controllers/os/sysinfo");

const osRouter = new Router();

osRouter.get("/os/info", getSysInfo);

module.exports = { osRouter };
