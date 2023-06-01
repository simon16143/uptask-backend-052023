

const checkAuth = async(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        

    }
    next()
}
export default checkAuth