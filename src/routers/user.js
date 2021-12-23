const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middlewares/auth');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancellationEmail} = require('../emails/account'); 
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
        // res.send({ user: user.getPublicProfile().then((data)=> {
        //     console.log(data);
        // }), token });
        res.send({ user, token });
        // res.send({ user: user.getPublicProfile(), token });
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})

router.patch('/users/me', auth,  async (req, res) => {
    console.log(22)
    const updates = Object.keys(req.body);
  

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation) {
        return res.sendStatus(400).send({error: 'Invalid Update!'})
    }

    try {

     
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        })

        await req.user.save();
        
        // certain mogoose queries by passes the mongoose middleware for example findByIdAndUpdate so we have to use more traditional method to get the job done'
        // const user = await User.findByIdAndUpdate(_id, obj, {new: true , runValidators: true});
        if(!req.user) {
            return res.status(404).send();
        } 

        res.send(req.user);
    } catch (error) {
        res.send(400).send(error)
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


router.delete('/users/me', auth, async (req, res) => {

    try {
        await req.user.remove();
        sendCancellationEmail(req.user.email, req.user.name)
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
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



router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})


router.get('/users', auth, async (req, res) => {
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


router.post('/users/logout',auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
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
        // await user.save();
        const token = await user.generateAuthToken();
        sendWelcomeEmail(user.email, user.name)
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


const multer = require('multer');
const upload =  multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        // \.doc$
        // \.(doc|docx)$
        // if(!file.originalname.endsWith('.pdf')) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
           return cb(new Error('please upload an image file!'))
        }
        cb(undefined, true)
        // cb(undefined, false)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'),  async (req, res) => {
    // req.user.avatar = req.file.buffer;

    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

    req.user.avatar = buffer;


    await req.user.save();
    res.send(200);
},(error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user =  await User.findById(req.params.id);

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg');
        res.set('Content-Type', 'image/png');
        // res.contentType('image/jpg');
        // res.set("Content-Disposition", "inline;");
        res.send(user.avatar);

    } catch (error) {
        res.status(404).send();
    }
})

module.exports = router;