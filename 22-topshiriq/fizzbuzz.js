mudule.exports.fizzBuzz = function (input) {
    if(typeof input !== 'number') throw new Error('input son bolishi kerak');
    if(input % 3 === 0) return 'Fizz';
    if(input % 5 === 0) return 'Buzz';
    if((input % 3 === 0) && (input % 5) === 0) return 'FizzBuzz';


    return 'input'

}