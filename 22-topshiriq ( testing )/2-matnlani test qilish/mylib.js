const db = require('./db');
// sonlarni testlash
module.exports.absolute = function(number) {
    return (number >= 0) ? number : -number;
}

// matnlarni testlash
module.exports.salam = function(name) {
    return 'Assalomu aleylkum ' + name;
}

// Qatorlarni test qilish
module.exports.getCurrenciec = function () {
    return ['UZS', 'MYR', 'TRY']
}

// OBYEKLTLARNI TESTLASH
module.exports.getProduct = function (productId) {
    return {id: productId, title: 'banana', price: 2};
}

// xatolarni test qilsih
module.exports.registerUser = function(userName){
    if(!userName) throw new Error('UserName is required');

    return {id: 111, userName: userName};
}

// mashgulot
module.exports.fizzBuzz = function (input) {
    if(typeof input !== 'number') throw new Error('input son bolishi kerak');
    if((input % 3 === 0) && (input % 5) === 0) return 'FizzBuzz';
    if(input % 3 === 0) return 'Fizz';
    if(input % 5 === 0) return 'Buzz';
    
    return input;
}
//  Mock funksiyalar haqida 

module.exports.applyDiscount = function(order){
    const customer = db.getCustomer(order.customerId);
    if(customer.points > 100 )
        order.totalPrice = order.price - (order.price * 0.1);
}