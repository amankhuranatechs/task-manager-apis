const mongoose = require('mongoose');
const validator1 = require('validator');

mongoose.connect(process.env.MONGODB_URL);


/**
 * 
 * 
// Task model
 const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: 'Learing Nodejs',
    completed: true
})

task.save().then((task)=> {
    console.log(task);
}).catch((e) => {
    console.log(e);
})

 */


/**
 * 
 * 
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true, 
        lowercase: true,
        validate(value) {
            if(!validator1.isEmail(value)){ 
                throw new Error('Email is not valid.')
            }
        }
    },
    age: {
        type: Number,
        default: 18,
        validate(value) {
            if(value < 1) {
                throw new Error('Age must be a positive Number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
});
 */

/**
 * create a new User
 * 
 */
    // const me = new User({   
    //     name: 'Noor2',
    //     email: 'noor2@finxera.com ',
    //     password: 'abcd1234'
    // })

    // me.save().then((me)=>{
    //     console.log(me)
    // }).catch((e)=>{
    //     console.log('Error',e)
    // })



