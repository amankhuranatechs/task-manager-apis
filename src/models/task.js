const mongoose = require('mongoose');
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
    }
})

taskSchema.pre('save', function(next) {
    next()
})

const Task = mongoose.model('Task',taskSchema )


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