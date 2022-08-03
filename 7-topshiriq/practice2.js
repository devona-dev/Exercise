const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/practice2')
 .then(()=>{
    console.log('Mongo ishlab ketdi..');
 })
 .catch((err)=>{
    console.error('Ulanishda xatolik..', err)
 })

 const authorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
 })

 const bookSchema = new mongoose.Schema({
    title: String,
    authors: {
        type: ['authorSchema'],
        required: true
    } 
 })

 const Author = mongoose.model('Author', authorSchema);
 const Book = mongoose.model('Book', bookSchema);

 async function createBook(title, authors){
    const book = new Book({
        title,
        authors: authors
    })

    const result = await book.save();
    console.log(result);
 }

createBook('React to\'liq qo\'llanma', [
    new Author({
        firstName: 'Farkhod',
        lastName: 'Dadajonov',
        email: 'Far@mail.ru'
    }),
    new Author({
        firstName: 'Ibrohim',
        lastName: 'Dadajonov',
        email: 'asr@mail.ru'
    })

]
);

// async function updateBook(bookId){
//    await Book.updateOne({_id: bookId}, {
//         $unset: {                                        // $unset:}
//             'author': ''
//         }
//     });
// }

// updateBook('62e2245c3ceec3991ca15b69');