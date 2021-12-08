require('../src/db/mongoose');
const Task =  require('../src/models/task');


//Without async await
Task.findByIdAndDelete('619cad104f96e5230801afa5', {completed: true}).then((result) => {
    console.log(result);
    return Task.countDocuments({completed: false})
}).then((tasks) => {
    console.log(tasks);
}).catch((e) => {
    console.log(e);
})

//With Async await
const deleteAndCountDocuments = async (id) => {
    await Task.findByIdAndDelete(id);
    const count = Task.countDocuments( );
    return count
}

deleteAndCountDocuments('619ccc8e7081852ef92fc4a7').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e)
})

