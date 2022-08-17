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

