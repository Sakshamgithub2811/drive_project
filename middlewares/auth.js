const jwt = requrie('jsonwebtoken');

function auth(req,res,next){
    const token = req.cookies.token;

    console.log(token);
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}