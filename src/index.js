const express = require('express')
require('../src/db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express();
const port = process.env.PORT;

app.use(express.json()) 
app.use(userRouter);
app.use(taskRouter);
app.listen(port, () => {
    console.log('listening on port',port);
})
const multer = require('multer')
const upload = multer({
    dest:'images'
})
app.post('/upload',upload.single('upload'),(req,res) => {
     res.send()
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    /* sign is a jwt method which will retun a jwt token. it expects two params
    1st one the unique identifier for the user who is being authenticated 
    2nd arguments is secret this is gonna be used to sign the token making sure that it hasn't been altered. 
    need to provied randon characters for this */
    const token = jwt.sign({ _id : 'abc123'}, 'thisismynewcourse', { expiresIn: '7 days' }); 
    console.log('token',token);
    /* Output for the above 
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE2MjM2MDAxMDR9.7YBW8ny-MT53KARLaj4SWAoOOhvGL16dx2ZgP8uYc-Q
    the abobe JWT is divided into three parts Header, Payload/body and Signature seperated with .(dot) 
    1) Header - it is base64 encoded data which says what type of token it is and the algorithem that was used to generate it
    2) Payload/body - it is base64 string which was provided by us (ex:_id)
        if the Payload/body is decoded it is the combination of _id we've provided and the timestamp 
    3) Signature - it is used to verify the token
    */
    // To verify the token
    const verifyToken = jwt.verify(token,'thisismynewcourse');
    console.log('verifyToken',verifyToken);
}

// myFunction();

const Task = require('./modals/task');
const User = require('./modals/user');

const main = async () => {
    /* let task = await Task.findById('60d0d55d73bd0c33b6e819b7'); 
    await task.populate('owner').execPopulate()
    console.log('task',task); */
    let user = await User.findById('60d0d2d6cc5ef630bd11e385');
    await user.populate('tasks').execPopulate()
    console.log('user',user.task);
}

// main();