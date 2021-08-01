const jwt = require('jsonwebtoken');
const User = require('../modals/user'); 

const auth = async (req,res,next) => {
    // console.log('in auth middleware function');
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, 'thisismynewcourse') // this will return { _id: '60c5f5be36d4a7768d4d6c79', iat: 1624191411 } _id is user id
        const user = await User.findOne({ _id : decoded._id, 'tokens.token':token }) // if token is equal to any of tokens.token
        if(!user){
            throw new Error()
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log('error =>',error);
        res.status(400).send(error)
    }
}

module.exports = auth;