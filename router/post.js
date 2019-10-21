const router = require('express').Router()

const verify = require('../jwt')

router.get('/post', verify, (req, resp) => {
    const post = {
        title: "My first post",
        content: "Life is beautiful, especially when things works out fine"
    }

    resp.send(post)
})


module.exports = router