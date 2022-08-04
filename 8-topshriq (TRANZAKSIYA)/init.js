const mongoose = require('mongoose');
const User = require('./models/user');

const connString = 'mongodb://FarkhodPC:27019/trans'; // ozimnikini qoyaman
async function initDatabase() {

    // bazaga ulanamiz

await mongoose.connect(connString, {
    replicaSet: 'rs',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const senderAccountNumber = '' // ozimnikini qoyaman
const receiverAccountNumber = '' // ozimnikini qoyaman

// jonatuvchini hisob raqami boyicha bazada qidirib topamiz

let sender = await User.findOne({accountNumber: senderAccountNumber});

// agar topilmasa , unda bazaga yangi hujjat qoshamiz
    if(!sender) {
        sender = new User({
            accountNumber: senderAccountNumber, name: 'Ahmad', balance: 50000.00
        });
        await sender.save();
    }
    
// oluvchini bazaadan izlab koramiz
let receiver = await User.findOne({accountNumber: receiverAccountNumber});

// agar topilmasa bazaga yanigisini qoshib qoyamiz
    if(!receiver){
        receiver = new User({
            accountNumber: receiverAccountNumber, name: 'Anvar', balance: 1200.00
        });

        await receiver.save();
    }
}

// initDatabase functsiyamizni modulimizda eksport qilamiz
module.exports = initDatabase;
