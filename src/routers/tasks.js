const express = require('express');
const { update } = require('../models/task');
const router = express.Router();
const auth = require('../middlewares/auth.js');
const Task = require('../models/task');

const allowedUpdates = [ 'email', 'name', 'age', 'password', 'description', 'completed' ];

// Deleting a task                                                                 
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        // const task = await Task.findByIdAndDelete(_id);
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

//Updating the task
router.patch('/tasks/:id',auth,  async (req, res) => {
    const updates = Object.keys(req.body);
    const _id = req.params.id;

    const isAllowedOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isAllowedOperation) {
        return res.status(400).send({error:'Invalid updates!'})
    }

    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id })
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
       
        if(!task) {
            return res.send(404).send();
        }
        updates.forEach((update) => {
            task[update] = req.body[update];
        })
        await task.save()
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }

})

// Creating the task
router.post('/tasks', auth, async ( req, res ) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error);
    }

    // task.save().then((task) => {
    //    res.status(201).send(task);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
})

//Getting the task
router.get('/tasks', auth, async (req, res) => {
    // console.log(req.query)
    const match = {}
    if(req.query.completed) {
        match['completed'] = req.query.completed === 'true'
    }

    const sort = {};

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        // const tasks = await Task.find({});

        //Method 1
        // const tasks = await Task.find({owner: req.user._id });
        

        // Method 2
        await req.user.populate([
            {   
                path: 'tasks' , 
                match,
                options: {
                    limit : parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                },
            }
        ]);
        const tasks = req.user.tasks;

        if(!tasks) {
          return   req.status(404).send();
        }
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

//Get a task
router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id;

    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error)
    }

    // Task.findById(_id).then((task) => {
    //     if(!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task);
    // }).catch((e) => {
    //     res.status(500).send(e);
    // })
})

module.exports = router;