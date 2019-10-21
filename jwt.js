const jwt = require('jsonwebtoken')

module.exports = (req, resp, next) => {
    const token =  req.header("AUTH_USER")
    if (!token) return resp.status(401).send("Access Denied")

    try{
        const verify_token = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verify_token
        next()
    }
    catch(err) {
        resp.status(404).send("Invlid Token")
    }
    
}