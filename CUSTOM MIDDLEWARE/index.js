const express = require('express');
const app = express();
const authen = require('./middleware/authentication');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const books = require('./routes/books')
const home = require('./routes/home')

app.use(express.json());


app.use(authen);
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/books', books);
app.use('/', home);
app.use(express.static('public'));
app.set('view engine', 'pug');

console.log(process.env.NODE_ENV);
console.log(app.get('env'));
console.log(config.get('name'));
console.log(config.get('mailserver.host'));



const port = process.env.PORT | 5000;

app.listen(port, ()=>{
    console.log(`${port} port bilan aloqa ulandi...`);
})