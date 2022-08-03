const express = require('express');
const router = express.Router();
const Joi = require('joi');

const books = [
    {id: 1, name: 'Clean Code...'},
    {id: 2, name: 'Big data'},
    {id: 3, name: 'Server reading'}
]

router.get('/', (req, res)=>{
    res.send(books);
});


router.get('/:id', (req, res)=>{
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book)
       res.status(404).send('Bunaqa ID topilmadi. ..');

    res.send(book);
});

router.post('/', (req, res)=>{
    const schema = Joi.object({ name: Joi.string() .required() .min(3) })                   //               ----------------- bu bizaga Validatsiya qilishga yordam beradi        
    const { error } = schema.validate(req.body)                                            // -------->>>> req da kelgan xabarni xatosini korsatadi
        if(error){
            return res.status(404).send(error.details[0].message);
        }
            
    const book = {
        id: books.length + 1,
        name: req.body.name
    };

    books.push(book);
    res.status(201).send(book);
});

router.put('/:id', (req, res)=>{
    // qidirib topadigan kod yozamiz
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book)
       res.status(404).send('Bunaqa ID topilmadi. ..');

    // kiritilayotgan malumotni validatsiyadan o'tkazamiz
    const schema = Joi.object({ name: Joi.string() .required() .min(3) })                   //               ----------------- bu bizaga Validatsiya qilishga yordam beradi        
    const { error } = schema.validate(req.body)                                            // -------->>>> req da kelgan xabarni xatosini korsatadi
        if(error){
            return res.status(404).send(error.details[0].message);
        }

    // malumotni yangilaymiz
    book.name = req.body.name
    res.send(book)
})

router.delete('/:id', (req, res)=>{
      // qidirib topadigan kod yozamiz
      const book = books.find(b => b.id === parseInt(req.params.id)); 
      if(!book)
         res.status(404).send('Bunaqa ID topilmadi. ..');
    
    // udalit qilamiz
    const bookID = books.indexOf(book);
    books.splice(bookID, 1);
    res.send(book);
})


module.exports = router;