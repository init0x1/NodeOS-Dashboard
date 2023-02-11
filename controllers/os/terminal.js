const child_process = require("child_process")

const terminal = (req,res)=>{
    if(!req.query.hasOwnProperty('command')){
        return res.status(400).writeJSON({"Error":"You Should use this endpoint with this query value: command" })
    }
try {
    const command = String(req.query.command)
    const commandResult = child_process.execSync(command)
    
    res.status(200).writeJSON({
        "command-result": commandResult.toString("utf-8").split("\n")
    })
    
} catch (error) {

    return res.status(400).writeJSON({ "Error": String(error).split("\n") });
}
}
module.exports = {terminal}