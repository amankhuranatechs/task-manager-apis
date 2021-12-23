const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true, // makes sure that email will be unique just like an ID
        required: true,
        trim: true, 
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){ 
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},{
    timestamps: true
});



userSchema.methods.toJSON =  function() {  // Any function written async before it always returns promise
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;  
    
    return userObject;
}


userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})



 /// this is an instant of user, instants method
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET);
    user.token =  user.tokens.push({token});
    await user.save();

    return token;
}


// Static methods
userSchema.statics.findByCredentials = async (email,password ) => {
    const user = await User.findOne({email});

    if(!user) {
        throw new Error('Unable to login, not a valid email.')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user;
}

// This is mongoose middleware
userSchema.pre('save',  async function(next) {
    const user =  this;

    // console.log(user.isModified('password'));
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    
    // console.log('Just before save it',user);
    next();
})

const Task = require('./task');
userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({ owner : user._id})
    next()
})


// user.password = await bcrypt.hash(user.password, 8);
const User = mongoose.model('User', userSchema);




const User1 = mongoose.model('User1', {
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
            if(!validator.isEmail(value)){ 
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

// fdasfl345
// fasdf
// 
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

    module.exports = User;