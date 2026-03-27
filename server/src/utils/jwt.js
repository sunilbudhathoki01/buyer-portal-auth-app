import jwt, { verify } from "jsonwebtoken"


// creating jwt and sign
export const createJwt=(payload)=>{
    if(!payload){
        throw new Error("Payload is required")
    }
     return jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"1d"});
}


// verify token
export const verifyJwt=(token)=>{
try {
    return jwt.verify(token,process.env.JWT_SECRET)
} catch (error) {
throw new Error("invalid or expired token")    
}
}
