const express = require('express');
const router = new express.Router()

const app = express();
const port = process.env.PORT;

//making the connection on server start with db
require('./db/mongoose');

// Not needed below code now
// const User = require('./models/user.js');
// const Task = require('./models/task');

const userRouter =  require('./routers/user');
const taskRouter =  require('./routers/tasks');


// Without middleware : new request ->  run route handler
// With middleware :  new Request -> do something -> run route handler

// middleware 
/**
 * 
 app.use((req, res , next) => {
     console.log(req.method, req.path);
     if(req.method === 'GET') {
         res.send('Get requests are disabled!! ')
     } else {
         next();
     }
 })
 * 
 * 
 */
// Maintenace mode
// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down, check after sometime.')
// })


// when we write this line(middleware), express will be automatically parsing the incoming req into objects
app.use(express.json());

//Register the USER router to expres    s
app.use(userRouter);
app.use(taskRouter);






/**
 * router.get('/test', (req, res) => {
    // console.log('This is from another routre!!!')
    res.send('This is from another routre!!!');
    })
    app.use(router);
 */

// app.listen(port, ()=>{
//     console.log(`Server stated at port ${port}`)
// })

// Upload files

const multer = require('multer');
const upload =  multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        // \.doc$
        // \.(doc|docx)$
        // if(!file.originalname.endsWith('.pdf')) {
        if(!file.originalname.match(/\.(doc|docx)$/)) {
           return cb(new Error('please upload a doc/docx file!'))
        }
        cb(undefined, true)
        // cb(undefined, false)
    }
})

const errorFromMiddleware = () => {
    throw new Error('Error from middle ware')
}

app.post('/upload', upload.single('upload'), (req, res) => {
    console.log(22)
    res.send(200);
},(error, req, res, next) => {
    // console.log(error.message);
    res.status(400).send({error: error.message})
})




module.exports = app;

//Below is an example of finding the TASKS of the USER

/***
 * 
 * 
 const User = require('./models/user.js');
 
 const main = async () => {
     const user = await User.findById('61b310012f02fd045fffb318');
     await user.populate([{path: 'tasks'}])
     console.log(user.tasks)
 }
 
 main()
 */

// Below in an example of populating the user in the task 

/***
 * 
 *  find the user of the task
const Task = require('./models/task');

const main = async () => {
    const task = await Task.findById('61b73d37a55bc389e22dbb2d');
    // await task.populate('owner').execPopulate(); // old documentation
    await task.populate([{path: 'owner'}])
    console.log(task.owner);
}


main()

 */




// toJSON method Explaination

/**
 * 
 * 
 let shoes = {
    name: 'woodlond'
}

shoes.toJSON = function() {
    console.log(72, this);
    return {};
}

console.log(21, JSON.stringify(shoes));
console.log(22, shoes);
 */



/**
 *  JSON webToken payground  - explaination
 * 
 const jwt = require('jsonwebtoken');
 const jsonwebTokenfunction = () => {
     const token = jwt.sign({ _id: '123' },'thisismynodecourse', { expiresIn: '7 days' });
 
     console.log(token);
 
     const payload = jwt.verify(token, 'thisismynodecourse');
 
     console.log(payload);
 }
 
 jsonwebTokenfunction();
 * 
 */

/**
 *   bcrypt explaination
 * 
 const bcrypt = require('bcryptjs');
 const myfunction = async () => {
     const password = 'abcd1234';
     const hashedPassword  = await bcrypt.hash(password, 8);
     console.log(hashedPassword);
 
     const isMatch = await bcrypt.compare('abcd1234', hashedPassword)
     console.log(isMatch);
 }
 */



// myfunction()