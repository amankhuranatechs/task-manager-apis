const request =  require('supertest');
const app = require('../src/app');
const User = require('../src/models/user.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userOneId = new mongoose.Types.ObjectId();
const userOne =  {
    _id: userOneId,
    name: "Test Name",
    email: "amankhurana812@gmail.com",
    password: 'abcd1345',
    tokens:[{
        token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
    }]
}



//Either use done or async
beforeEach(async () => {
    // console.log('Before Each!!');
    await User.deleteMany();
    const user = new User(userOne);
    // await new User(userOne).save();
    await user.save();
    // done();
})

// afterEach(() => {
//     console.log('After Each!!')
// })

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Aman Test',
        email: 'amankhurana81111@gmail.com',
        password: 'abcd12345'
    }).expect(201);

    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //Assertions about the response
    expect(response.body).toMatchObject({
        user:{
            name: "Aman Test",
            email: "amankhurana81111@gmail.com"
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('abcd12345')

}) 


test('Should log in existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id);

    expect(response.body.token).toBe(user.tokens[1].token);


})


test('Should not logIn with existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'userOne.password'
    }).expect(400)
})


test('SHould get the user Profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
})


test('Should not get Profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
})

test('Should delete account for user', async () => {
   const response =  await request(app)
          .delete('/users/me')
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
          .send()
          .expect(200);
    const user = await User.findById(response.body._id);
    expect(user).toBeNull();

})
test('Should delete account for user', async () => {
    await request(app)
          .delete('/users/me')
          .send()
          .expect(401)
})

test('Should upload an avatar', async () => {
    await request(app)
            .post('/users/me/avatar')
            .set('authorization', `Bearer ${userOne.tokens[0].token}`)
            .attach('avatar', 'tests/fixtures/profile-pic.jpg')
            .expect(200)
})