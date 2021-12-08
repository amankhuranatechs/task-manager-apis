const express = require('express');
const User = require('../models/user');
const router = new express.Router();

// 
// router.get('/test',  (req, res) => {
//     res.send('FRom a new file!!')
// })

// !!IMPORTANT replace app.get with router.get

const allowedUpdates = [ 'email', 'name', 'age', 'password', 'description'];


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        if(!user) {
            res.status(400).send()
        }
        res.send({ user, token });
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
  

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid Update!'})
    }

    const _id  = req.params.id;
    const obj =  req.body;
    try {

        const user = await User.findById(_id);
        updates.forEach((update) => {
            user[update] = req.body[update];
        })

        await user.save();
        
        // certain mogoose queries by passes the mongoose middleware for example findByIdAndUpdate so we have to use more traditional method to get the job done'
        // const user = await User.findByIdAndUpdate(_id, obj, {new: true , runValidators: true});
        if(!user) {
            return res.status(404).send();
        } 

        res.send(user);
    } catch (error) {
        res.send(400).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
         res.status(500).send(error);
    }

})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);    
    } catch (error) {
        res.status(500).send();
    }
    

    /**
     * 
     *  User.find({}).then((users) => {
            res.send(users)
        }).catch((e) => {   
            console.log(e)
            res.status(500).send();
        })
     * 
     */
    
})

router.get('/users/:id', async (req, res) => {
    // console.log(req.params);
    const _id =  req.params.id;
    try {
        const user = await User.findById(_id);
        if(!user) {
            return res.status(400).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
    

/***
 *   
 * User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e);
    })
 * 
 * 
 */
    

})

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token})
    } catch(e) {
        console.log(e);
        res.status(400).send(e)
    }


    /***
     * 
     *  console.log(req.body);
        user.save().then((user) => {
            res.status(201).send(user)
        }).catch((e)=> {
            res.status(400).send(e);
            // res.send(e);
        })
        // res.send('Testing!!');
     * 
     */
   
})


module.exports = router;