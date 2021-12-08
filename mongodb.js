///CRUD

//Before destructuring
/***
 * 
 const mongodb = require('mongodb');  // returns an object
 const MongoClient = mongodb.MongoClient;
 const ObjectId = mongodb.ObjectID;
 * 
 */ 

//  After Destructuring

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'; // localhost is not being used because it makes the system slow,
const databaseName = 'task-manager';

/**
 *  we can generate our own object ids also!!
 * 
    const id = new ObjectID();
    console.log(id.id.length);
    console.log(id.toString());
    console.log(id.toString().length);
    console.log(id.toHexString());
 * 
 */



MongoClient.connect(connectionURL, (error, client) => {
    if(error) {
        return console.log(error, 'Unabel to connect to database!!')
    } 
    console.log('Connected correctly!!');

    //Creating a database
    const db = client.db(databaseName); //returns a database reference!!


    //TASK COLLECTION


    db.collection('tasks').deleteOne({
        description: 'Learn nodejs'
    }).then((result)=>{
        console.log(result)
    }).catch((e)=>{
        console.log(e)
    })

    /// Update

    // db.collection('users').deleteMany({
    //     completed: false
    // }).then((result)=> {
    //     console.log(result)
    // }).catch((e)=>{
    //     console.log(e)
    // })

    /****
     * 
     * TASK COLLECTION
     * 
     * 

    const updateMany = db.collection('tasks').updateMany({
        completed: false
    },{
        $set:{
            completed : true
        }
    })


    updateMany.then((result) => {
        console.log(result)
    }).catch((e)=>{
        console.log(e)
    })
     */

    /***
     * 
     * USER COLLECTION
     * 
    const updatePromise = db.collection('users').updateOne(
        {
            _id: new ObjectID('619a215b8308550bd05aed49')
        }, {
            $set: {
                name: 'Vir Dass'
            },
            $inc: {
                age: 1
            }
     })

     updatePromise.then((result) =>  {
        console.log(result)
     }).catch((e)=>{
         console.log(e)
     })

     */


     //READ
    /****
     * 
     *  TASK COLLECTIONS

        db.collection('tasks').findOne({ _id: new ObjectID('619b52d584de5e2f74a96096') }, ( error, task) => {
            console.log(task);
        })

        db.collection('tasks').find({completed: true}).toArray((error, tasks)=> {
            console.log(tasks)
        })
     */



    /**
     * 
     * USERS COLLECTION

    // FIND ONE
        db.collection('users').findOne({_id: new ObjectID('619a2b8e9d6af9d63973fde2')}, (error, user)=> {
            if(error){
                return console.log('Unable to fetch!!')
            }
            console.log(user)
        })

        db.collection('users').find({ age: 30 }).toArray((error, users)=>{ 
            console.log(users)
        })

        db.collection('users').find({ age: 30 }).count((error, count) => {
            console.log(count);
        })
     */

});




