const {Router} = require("./utils/core/Router")

const {createServer}=require("http")
const {bodyParse} = require("./utils/core/middlewares/bodyparser-middleware")

const app =new Router()
app.use(bodyParse())

const server =createServer((req,res)=>{
	  app.startRouting(req, res)
}) 




app.get("/",(req,res)=>{
	  res.status(200).writeJSON({"msg":"Welcome to OS Management Dashboard Server"}) 
})


const PORT = process.env.PORT || 3000

server.listen(PORT,()=>{
	  console.log(`[+] Server Is Listenting On ${PORT}`)
})
