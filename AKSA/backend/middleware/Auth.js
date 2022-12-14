const jwt = require ('jsonwebtoken')

const protect = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1]

    console.log(req.headers.authorization)
    if(!token){
        res.status(403).json({
            message : "You don't have  token.",
            status: "Error"
        });
        return;
    }
    //==========| Decoded |=========================//
  
   

    const decoded = jwt.verify(token, process.env.jwt_sec, (error, data)=>{
     if(error){
        res.status(403).json({
          message: "You are not Authoticated.",
          status: "Error",
        });
        return
     }   
     return data;
    });
    console.log(decoded)
    req.user = decoded;
    console.log(req.user.user)
    next();

}

module.exports = {
    protect
}


