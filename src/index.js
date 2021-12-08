const express = require('express');
const router = new express.Router()

const app = express();
const port = process.env.PORT || 5000;

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
app.use((req, res , next) => {
    console.log(req.method, req.path);
    next();
})

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

app.listen(port, ()=>{
    console.log(`Server stated at port ${port}`)
})

/**
 *  JSON webToken payground
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
 * 
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