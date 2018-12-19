//archivo para crear objero de conexion
const mysql = require('mysql');

//Configuracion de la conexion
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company'
});

//Conexion a la base 
mysqlConnection.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Db is connected');
    }
});


//Exportarlo para utilizarlo en otra partes de la app
module.exports = mysqlConnection;