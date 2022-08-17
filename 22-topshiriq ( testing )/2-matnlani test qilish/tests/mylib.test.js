const myLib = require('../mylib');

describe('absolut', () => {
    it('Beriladigan son musbat bolsa qaytadigan son musbat', () => {
        const result = myLib.absolute(1);
        expect(result).toBe(1);
    })

    it('Beriladigan son manfiy bolsa qaytadigan son musbat', () => {
        const result = myLib.absolute(-1);
        expect(result).toBe(1);
    })

    it('Beriladigan son 0 bolsa qaytadigan son 0', () => {
        const result = myLib.absolute(0);
        expect(result).toBe(0);
    })
})

describe('salam', ()=>{
    it('Salom bersih funksiyasida name ni kiritish..', () => {
       const result = myLib.salam('Mamur');
       expect(result).toContain('Mamur');  // toContain bular matnlar bilan ishlash uchun
    //    expect(result).toMatch('Mamur');  // toMatch bular matnlar bilan ishlash uchun
    })
})

describe('getCurrenciec', ()=>{
    it('Pullarni olishni testlash', ()=>{
        const result = myLib.getCurrenciec();

        // o'ta umumiy test
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // ota umumiy testlash
        expect(result[0]).toBe('UZS');
        expect(result[1]).toBe('MYR');
        expect(result[2]).toBe('TRY');
        expect(result.length).toBe(3);

        // TOG'RI TESTLASH
        expect(result).toContain('UZS');
        expect(result).toContain('MYR');
        expect(result).toContain('UZS');
        expect(result).toEqual(expect.arrayContaining(['MYR', 'UZS', 'UZS'])) 
    })
}) 

describe('getProduct', ()=>{
    it('mahsulotni qaytarib beruvchi funcsiya', ()=>{
        const result = myLib.getProduct(11);
        // expect(result).toBe({id: 11, title: 'banana', price: 2}); // bu yaxshi testlash emas
        expect(result).toEqual({ id: 11, title: 'banana', price: 2 }) // hamma xossalari boyicha teksiradi 
        expect(result).toMatchObject({id: 11, price: 2}); // 
        expect(result).toHaveProperty('price', 2 ); // 

    })
})

describe('registerUser', ()=>{
    it('Name fasly bolsa xato qaytarsin', ()=>{
        // null , undefined, NaN, "", 0 va false
        const falsyItems = [null , undefined, NaN, "", 0 , false]
        falsyItems.forEach(fi => {
            expect(()=>{ myLib.registerUser(fi) }).toThrow();
        });
    })

    it('agar name bolsa bazaga qoshsin', ()=>{
        const user = myLib.registerUser('admin');
        expect(user).toMatchObject({userName: 'admin'}); 
        expect(user.id).toBeGreaterThan(0);
    })
})

describe('fizzBuzz', ()=>{
    it('agar input son bolmasa', ()=>{
        expect(()=>{ myLib.fizzBuzz('asd') }).toThrow();
        expect(()=>{ myLib.fizzBuzz(null) }).toThrow();

    })

    it('agar 3 ga bolinsa', ()=>{
        const result = myLib.fizzBuzz(9);
        expect(result).toBe('Fizz')
    })

    it('agar 5 ga bolinsa', ()=>{
        const result = myLib.fizzBuzz(10);
        expect(result).toBe('Buzz')
    })

    it('agar 5 ga bolinsa', ()=>{
        const result = myLib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz')
    })

    it('agar 5 ga va 3 bolinmasa', ()=>{
        const result = myLib.fizzBuzz(2);
        expect(result).toBe(2)
    })
})