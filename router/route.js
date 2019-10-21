const router = require('express').Router()
const userModels = require('../user/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Validation
//const joi = require('@hapi/joi')
// const schema = {
//     name: joi.string()
//         .min(6)
//         .required(),
//     email: joi.string()
//         .min(15)
//         .required()
//         .email(),
//     password: joi.string()
//         .min(6)
//         .required()
// }



router.post('/register', async (req, resp) => {

    // const validateUser = joi.validate(req.body, schema)

    //console.log(validateUser)
    const emailExist = await userModels.findOne({email: req.body.email})
    
    //CHECK IF EMAIL ALREADY EXISTS
    if(emailExist) return resp.status(401).send("Email already exist") 

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    const user = new  userModels({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })


    try{
        const savedUser = await user.save()
        resp.send({user: savedUser.id})
    }
    catch(err) {
        resp.status(400).send(err)
    }
})


router.post('/login', async (req, resp) => {
    console.log(req.body)
    //CHECK IF EMAIL ALREADY EXISTS
    const user = await userModels.findOne({email: req.body.email})
    if(!user) return resp.status(401).send("Email not found")

    //CONFIRM PASSWORD
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return resp.status(401).send("invalid password")

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "2 minutes"})

    resp.header("AUTH_USER", token).send(token)
})


module.exports = router