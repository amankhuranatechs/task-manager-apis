
const calculateTip = (total, tipPercentage = .25) =>  total + total * tipPercentage


const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celciusToFarhenheit = (temp) => {
    return (temp * 1.8) + 32;
}


const add = (a, b) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            if(a < 0 || b < 0){
                return reject("Number should be a positive integers!!")
            } 
            resolve(a+b);
        }, 2000)
        })
  
}

module.exports = {
    calculateTip  ,
    fahrenheitToCelsius,
    celciusToFarhenheit,
    add

}