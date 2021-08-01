const mongoose = require('mongoose');
// const validator = require('validator');
mongoose.connect(process.env.dbUrl,{
    useNewUrlParser : true,
    useCreateIndex : true
})

/* const user = mongoose.model('User',{
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true,
        validate (value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    }
})

const me = new user({
    name : 'dskjkl',
    age : 30,
    email : 'flkdfjlkdf@fdfdkjf.com'
    
})

me.save().then((res) => { console.log('Success ',res) }).catch((err) => { console.log('Error! ',err) }) */

/* const Task = mongoose.model('Task',{
    description : {
        type : String
    },
    completed : {
        type : Boolean
    }
});

const task = new Task({
    description : 'New task desc',
    completed : false
})

task.save().then((res) => { console.log('Success')}).catch((err) => { console.log('Error! ',err) }); */