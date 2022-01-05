//@ts-ignore
let mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

taskSchema.pre('save', function(next) {
    next()
})

const Task = mongoose.model('Task', taskSchema);

const Task1 = mongoose.model('Task1', {
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

module.exports =  Task;