const notFound=(req,res)=>{
    res.status(404).writeJSON({"Error":"404 Not Found"})
}

module.exports = {notFound}