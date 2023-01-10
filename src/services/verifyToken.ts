import jwt from "jsonwebtoken";

const secretKey = "iefbr@i3wbdow2~23e~m3b24d2e%$#Rge5n";

let verifyToken;
export default  verifyToken = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1]
    console.log('token is', token)
    if (!token){
        res.status(403).send("A token is required for authentication")
    }else {
       jwt.verify(token, secretKey, (err, decodedToken)=>{
           if (!err){
               req.decodedToken = decodedToken
           }else if(err){
               res.status(403).send(err)
           }
       })
    }
    return next();
};

module.exports = verifyToken;