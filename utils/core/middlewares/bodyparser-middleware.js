function bodyParse(){
	  return (req,_,next)=>{
			
	  let body=""
	  req.on("data",(data)=>{
			body+=data.toString('utf-8')
	  })

	  req.on("end",()=>{
    
			if(req.headers["content-type"]==="application/json"){
				  req.body=JSON.parse(body)
			}
    
			if(req.headers["content-type"]==="application/x-www-form-urlencoded"){
				  let result=body.split("&")
				  result.forEach((value,index,self)=>{self[index]=value.split("=")})
				  result.forEach((value)=>{req.body[value[0]]=value[1]; })         
			}
			  
	  })
			next()
   }
}
module.exports={bodyParse}
