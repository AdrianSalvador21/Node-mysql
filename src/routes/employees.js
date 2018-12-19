const express = require('express');
//Creara un objeto para poder definir trutas
const router = express.Router();

//Requerimos conexion
const mysqlConnection = require('../database');

//Aqui podemos realizar el sistema de rutas
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM empleados', (err, rows, fields) => {
        if (!err) {
            return res.json(rows);
        } else {
            console.log(err);
        }
    })
});


router.get('/:id', (req, res) => {
    //Obtener id
    const id = req.params.id;
    mysqlConnection.query('SELECT * FROM empleados WHERE id = ?', [id], (err, rows, fields) => {

        if (err) {
            return res.json({
                Status: false,
                msg: "Error al buscar"
            });
        }

        if (rows.length == 0) {
            return res.json({
                Status: false,
                msg: "No se encontro ningun usuario"
            });
        } else {
            return res.json(rows[0]);
        }

    });
})


//Insertar dato
router.post('/', (req, res) => {

    const nombre = req.body.nombre;
    const rol = req.body.rol;


    const query = `
    INSERT INTO empleados (nombre, rol) VALUES (?, ?);
    `;

    mysqlConnection.query(query, [nombre, rol], (err, rows, fields) => {
        if (!err) {
            return res.json({ Status: 'Empleado guardado' });
        } else {
            console.log(err);
        }
    });
});

router.put('/:id', (req, res) => {
    const nombre = req.body.nombre;
    const rol = req.body.rol;
    const id = req.params.id;

    const query = `
    UPDATE empleados SET nombre = ?, rol = ? WHERE id = ?;
        `;

    mysqlConnection.query(query, [nombre, rol, id], (err, rows, fields) => {
        if (!err) {
            return res.json({
                Status: 'Empleado actualizado'
            })
        } else {
            console.log(err);
        }
    })

});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM empleados WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            return res.json({ Status: 'Empleado eliminado' });
        } else {
            console.log(err);
        }
    });
});



module.exports = router;