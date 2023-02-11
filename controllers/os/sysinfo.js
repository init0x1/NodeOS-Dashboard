const os = require('os');

const getSysInfo = (req, res) => {
  try {
    const response = {};
    response.arch = os.arch();
    response.cpu = os.cpus()[0];
    response.totalMemory = parseInt(os.totalmem() / 1000000000);
    response.os = os.platform();
    response.hostname = os.hostname();

    if (req.query.verbose === 'true') {
      response.uptime = os.uptime();
      response["cpu-cores"] = os.cpus().length;
      response["os-version"] = {
        release: os.release(),
        version: os.version(),
        kernel: os.type(),
      };
      response["Network Interfaces"] = os.networkInterfaces();
      response["current-user-info"] = os.userInfo();
    }

    res.status(200).writeJSON({ result: response });
  } catch (err) {
    res.status(500).writeJSON({ Error: "Sorry, an internal error has occurred :(" });
  }
};

module.exports = { getSysInfo };
