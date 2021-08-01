const express = require('express');
const router = new express.Router();
const User = require('../modals/user');
const auth = require('../middleware/auth');
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (error) {
        res.status(404).send(error)
    }
    /* user.save().then((response) => {
        res.status(200);
        res.send(response);
    }).catch((err) => {
        res.send(err);
    }) */
});

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken()
        // console.log('token',token);
        res.send({user,token});
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/users',auth, (req, res) => {
    User.find({}).then((response) => {
        // console.log('res',response); 
        res.send(response); 
    }).catch((err) => {
        res.status(500).send(err);
    })
});

router.get('/user/me',auth, (req, res) => {
    res.send(req.user)
});

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((el) => {
            console.log('el',el);
            return el.token !== req.token
        }) 
        await req.user.save();
        res.send();
    } catch (error) {
        console.log('error',error);
        res.status(400).send(error)
    }
})

router.post('/user/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/user/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        if(!user){
            return res.status(404).send('No user found');
        }
        res.status(200).send(user);
    }).catch((err) => {
        res.status(500).send(err.message)
    })
});
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    // console.log('req.body',req.body);
    try {
        
        const user = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        // const user =  await User.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidator : true })

        if(!user) {
            res.status(404).send()
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error)
    }
});
router.delete('/user/:id', async (req, res) => {
    try {
        const user =  await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;