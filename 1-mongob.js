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

/**
 * 
    const { MongoClient, ObjectID } = require('mongodb');
    const connectionURL = 'mongodb://127.0.0.1:27017'; // localhost is not being used because it makes the system slow,
    const databaseName = 'task-manager';
 * 
 */

/**
 *  we can generate our own object ids also!!
 * 
 * 
 * 
    const id = new ObjectID();
    console.log(id.id.length);
    console.log(id.toString());
    console.log(id.toString().length);
    console.log(id.toHexString());
 * 
 * 
 */



MongoClient.connect(connectionURL, (error, client) => {
    if(error) {
        return console.log(error, 'Unabel to connect to database!!')
    } 
    console.log('Connected correctly!!');

    //Creating a database
    const db = client.db(databaseName); //returns a database reference!!

    //Insert One
        db.collection('users').insertOne({
            // _id: id,  we can generate our own ids
            name: 'Aman khurana',
            age: 30
        }, (error, result)=> {
            if(error) {
                console.log('Unable to insert the document!');
            } else {
                console.log(result.insertedId);
            }
        })

    // InsertMany
        db.collection('users').insertMany([
                { 
                    name: 'Dipesh',
                    age: 28
                },{
                    name: 'Noor',
                    age: 27
                }
            ],(error,result) => {
                console.log(error);
                console.log(result);
         })

    //Tasks using insert Many

    db.collection('tasks').insertMany([
        {
            description: 'Learn nodejs',
            completed: false
        },{
            description: 'Learn Reactjs',
            completed: false
        },{
            description: 'Make CRM',
            completed: false
        }
    ],(error, result) => {
            if(error) {
                return console.log('Unable to add documents!!');
            }
            console.log(result);
        })
});




