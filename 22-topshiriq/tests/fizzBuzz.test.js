const FizzBuzz = require('../fizzbuzz');

describe('fizzBuzz', ()=>{
    it('agar 3 ga qoldiqsiz bolsa', ()=>{
        const result = FizzBuzz.fizzBuzz(15);
        expect(result).toBe(0)
    })
})