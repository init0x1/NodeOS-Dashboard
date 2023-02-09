const url = require('url')
const querystring=require('querystring')


//  if You Want to Understand Every Thing Under The Hood You Can Try To Make SomeThing Like That but with Your methodology or on Your Pattern or Just Try to Understand How Every Thing Work



class Router {
			
			#routeRules;
			#middlewares;
			
			constructor(){
				  this.#routeRules=new Map();
				  this.#middlewares=new Array();
			}
			
	       #upgradeResponse(res){
				  
				  res.setHeader('Powered-By',"0xCrypt00o")


				  res.status=(statusCode)=>{
						res.statusCode=statusCode
						return res
				  }
				 
				 res.writeHTML=(data)=>{
						res.setHeader("Content-Type","text/html ; charset=utf-8")
						res.write(data)
						res.end()
				  }
				 
				 

				 res.writeJSON=(data)=>{
						res.setHeader("Content-Type","application/json ; charset=utf-8")
						res.write(JSON.stringify(data))
						res.end()
				  }
			}

			#upgradeRequest(req){
				  req.originalUrl=req.url
				  req.url=url.parse(req.url)
				  req.query={...querystring.parse(req.url.query)}
				  req.body={}
				  req.cookies={}
			}


			
			get middlewares(){
				  return new Array(...this.#middlewares)
			}
			
			get routeRules(){

				  return new Map(this.#routeRules.entries())
			}
			
			#createRouteIfNotExists(pathName){
				  if (this.#routeRules.has(pathName)){
						return
				  }
				  else{
						this.#routeRules.set(pathName, new Map())
				  }
			}

			#getHandleMapRef(pathName){
				  if(pathName){
						return this.#routeRules.get(pathName)
				  }
			}
			
	         #validateTypes(pathName,middlewares){

				  if (typeof pathName!=="string"){
						throw new Error("Error : pathname should be String ")
				  }
				  
				  if (typeof middlewares!=="function" && ! (middlewares instanceof Array && typeof middlewares[0] =='function') ){
						throw new Error("Error : controller must be a function takeing (reques,response) ")
				  }

			}


			#setRoute(pathName,requestMethod,middlewares){
				  this.#validateTypes(pathName,middlewares)
				  this.#createRouteIfNotExists(pathName)
				  this.#getHandleMapRef(pathName).set(requestMethod,middlewares)
			}
			
			get(pathName,...middlewares){

				  this.#setRoute(pathName,"GET",middlewares)
			}
	  
			 post(pathName,middlewares){
				   this.#setRoute(pathName,"POST",middlewares)
			}

			delete(pathName,middlewares){
				   this.#setRoute(pathName,"DELETE",middlewares)
			}
	     
			patch(pathName,middlewares){
				  this.#setRoute(pathName,"PATCH",middlewares)
			}
			
			put(pathName,middlewares){
				  this.#setRoute(pathName,"PUT",middlewares)

			}

			all(pathName,...middlewares){
				  for( let requestMethod of ["GET","POST","DELETE","PUT","PATCH"]){
						this.#setRoute(pathName,requestMethod,middlewares)
				  }
			}
	  		use(...args) {
				  
			  args.forEach((arg,index)=>{
	  			 switch(typeof arg ){
									case "function" :
										  this.#middlewares.push(args[0])
									break;
							  
									case "object" :
										  if(args[0] instanceof Router){
												
												this.#routeRules=new Map([...this.#routeRules,...args[0].routeRules])
												this.#middlewares=new Array(...this.#middlewares,...args[0].middlewares)
												
										  }
										  else{
												throw new Error("can,t invoked with object")
										  }
									break;
									default:
										  
												throw new Error(`type ${typeof args[0]} not valid argument type`)
										  
				  }
						
				})
			}
			
	  #routeing(request,response){
				  if(this.#routeRules.has(request.url.pathname) && this.#routeRules.get(request.url.pathname).has(request.method)  ){
					 this.#fireMiddlewares(request,response,this.#routeRules.get(request.url.pathname).get(request.method))
				  }

				  else{
						let handled = false
						this.#routeRules.forEach((_,pathname)=>{

							  if( new RegExp(pathname.concat("$")).test(request.method.url)){
									this.#fireMiddlewares(request,response,this.#routeRules.get(pathname).get(request.method))
									handled=true
									return
							  }
						})
						if(!handled){
							 throw new Error(`Unhandled ${request.url.pathname} with Unhandled Request Method ${request.method}`)
						}
				  }
			}
	   
	  #fireMiddlewares(request,response,middlewares){
			
			let middlewareGenerator= (  function* (initValue=0){
				  while(initValue<middlewares.length){
						yield initValue++
				  }
			})();
			
			

			function middlewareFlow(){
				 
				  let current=middlewareGenerator.next()	 
			
				  if(!current.done){ 
						middlewareFlow.middlewares[current.value](request,response,middlewareFlow);
				  }
			}

			middlewareFlow.middlewares=middlewares
			middlewareFlow()
	  }


	  startRouting(request,response){
				  this.#upgradeRequest(request)
				  this.#upgradeResponse(response)
				  this.#fireMiddlewares(request,response,this.#middlewares)	
				  this.#routeing(request, response)	
			}


}



module.exports={Router}
