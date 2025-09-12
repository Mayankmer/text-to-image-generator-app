import jwt from 'jsonwebtoken'

const userAuth = async (req,res,next)=>{
    const {token} = req.headers;

    if(!token){
        return res.json({
            success: false,
            message: 'Invalid user'
        })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(decodedToken){
            req.userId = decodedToken.id;
        }else{
            res.json({success: false, message: 'Not authorized login'})
        }
        next();
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export default userAuth;