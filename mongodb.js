/* const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient; */

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'task-manager';

const id = new ObjectID();
// console.log('id',id.getTimestamp());

MongoClient.connect(connectionURL, { useUnifiedTopology:true }, (err, client) => {
    if(err) {
        return console.log('error',err);
    }
    
    const db = client.db(databaseName);

    /* db.collection('users').insertOne({
        name : 'Mohammed',
        age : 24
    }, function (err, result) {
        if(err) {
            return console.log('error',err);
        }

        console.log('success',result.ops);
    }) */

    /* db.collection('users').insertMany([
        {
            name : 'Mohammed',
            age : 24
        },
        {
            name : 'Muzammil',
            age : 24
        }
    ], (err,res) => {
        if(err){
            return console.log('error',err);
        }

        console.log(res.ops);
    }) */

    /* db.collection('tasks').insertMany([
        {
            description : 'Clean the house',
            complete: true
        },
        {
            description : 'Task Two',
            complete: false
        },
        {
            description : 'Task Three',
            complete: false
        }
    ],(err,res) => {
        if(err){
            return console.log('error',err);
        }

        console.log(res.ops);
    }) */
    /* let name = 'Mohammed';
    db.collection('users').findOne({name: name},(err,res) => {
        if(err){
            return console.log('error',err);
        }

        console.log('result =>',res);
    }) */

    /* db.collection('task').find({},(err,res) => {
        if(err){
            return console.log('error',err);
        }

        console.log('result =>',res);
    }) */

    /* const promissFun = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve([1,2,3]);
            reject('Something went wrong');
        }, 2000);
    });

    promissFun.then((res) => {
        console.log('success',res);
    }).catch((err) => {
        console.log('ERROR',err);
    }) */

    /* db.collection('users').updateOne({
        _id : new ObjectID("6097a55be484b50e588f6237")
    },{
        $set : {
            name : 'MOhammed Again'
        }
    }).then((res) => {
        console.log('success',res);
    }).catch((err) => {
        console.log('Error',err);
    }) */

    /* db.collection('tasks').updateMany({
        complete : false
    },{
        $set : {
            complete : true
        }
    }).then((res) => {
        console.log('success',res.modifiedCount);
    }).catch((err) => {
        console.log('Error',err);
    }); */

    db.collection('users').deleteMany({
        age : 24
    }).then((res) => {
        console.log('success',res.deletedCount);
    }).catch((err) => {
        console.log('Error',err);
    })
})