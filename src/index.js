const express = require('express'); //Requerimo la funcionalidad de express y la guardamos en una constante

//Ya teniendo almacenado express en una variable, lo podemos ocupar 
const app = express() //Retorna un objeto


//Settings
app.set('port', process.env.PORT || 3000);




//Middlewares - Funciones que se ejecutan antes de procesar algo con el servidor
//--necesitamos que nuestras aplicaciones envien datos, principalmente en formato json
//Si recibimos algo en formato json, nuestro modulo será capaz de entenderlo y utilizarlo.
app.use(express.json());

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});



//Rutas - url para procesar datos
app.use('/empleados', require('./routes/employees'));
app.use('/productos', require('./routes/productos'));
app.use('/ventas', require('./routes/ventas'));


//Empézando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});