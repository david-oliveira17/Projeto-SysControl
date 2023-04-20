require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//conexão ao BD-------------------------------------------------------
const db = require('./models')

try{
    db.sequelize.authenticate()
    console.log('SEQUELIZE: connection has been established successfully.')
}
catch(error){
    console.error('* SEQUELIZE: unable to connect to the database', error)
    process.exit(1)   //encerra o servidor com erro
}
//----------------------------------------------------------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



/****************** ROTAS ******************/
const funcionarios = require('./routes/funcionarios')
app.use('/funcionarios', funcionarios)

const vendas = require('./routes/vendas')
app.use('/vendas', vendas)

const produtos = require('./routes/produtos')
app.use('/produtos', produtos)

const itemVendas = require('./routes/item_vendas')
app.use('/item_vendas', itemVendas)

const estoques = require('./routes/estoques')
app.use('/estoques', estoques)

const fornecedores = require('./routes/fornecedores')
app.use('/fornecedores', fornecedores)




module.exports = app;
