require('../src/db/mongoose');
const User = require('../src/models/user');

//619ca942783c4dfd3fadeef1

// Wihout using async await
User.findByIdAndUpdate('619ca942783c4dfd3fadeef1', { age: 1}).then((result) => {
    console.log(result);
    return User.countDocuments({age: 1});
}).then((count) => {
    console.log( 12,count);
}).catch((e) => {
    console.log(e);
})


// With Async await
const updateAgeAndThenCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count;
}



updateAgeAndThenCount('619ca942783c4dfd3fadeef1', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e);
})