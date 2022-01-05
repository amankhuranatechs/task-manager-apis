const {calculateTip, celciusToFarhenheit, fahrenheitToCelsius, add}  = require('../src/math.js');

test('Should calculated the tip correctly!', () => {
   
    const total =  calculateTip(10,0.3);
    expect(total).toBe(13);
    /**
     * 
     if(total !== 13) {
         throw new Error(`Total tip should be 13, but got ${total}`)
     }
     */
})

test('Should calculate the total with default tip',() => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
})

test('Should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelsius(32);
    expect(temp).toBe(0);
})

test('Should convert 0 C to 32F',  () => {
    const temp = celciusToFarhenheit(0);
    expect(temp).toBe(32);
})



// test("Async test demo",  (done) => {
//     setTimeout(() => {
//         expect(1).toBe(1);
//         done()
//     }, 2000);

// })


test('should Add two numbers',  (done) => {
    add(1, 3).then((result) => {
        expect(result).toBe(4);
        done();
    })

    // const sum  = await add(1, 3);
    // expect(sum).toBe(4);
    // done();
})

test('should Add two numbers using Await', async () => {
    const sum  = await add(1, 3);
    expect(sum).toBe(4);
    // done();
})



// test('Hello workld!', () => {

// })


// test('This should fail', () => {
//     throw new Error('Failure by me')
// })