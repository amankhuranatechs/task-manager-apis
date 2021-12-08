const express = require('express');
const { update } = require('../models/task');
const router = express.Router();
const Task = require('../models/task');


const allowedUpdates = [ 'email', 'name', 'age', 'password', 'description'];

//Deleting a task
router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(_id);
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const _id = req.params.id;

    const isAllowedOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isAllowedOperation) {
        return res.status(400).send({error:'Invalid updates!'})
    }

    try {
        const task = await Task.findById(_id);

        updates.forEach((update) => {
            task[update] = req.body[update];
        })

        await task.save()
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        if(!task) {
            return res.send(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }

})

router.post('/tasks', async ( req, res ) => {
    console.log('dsfasd')
    const task = new Task(req.body);

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

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
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

router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(400).send();
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