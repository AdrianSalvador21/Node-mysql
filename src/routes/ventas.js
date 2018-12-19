const express = require('express');
//Creara un objeto para poder definir trutas
const router = express.Router();

//Requerimos conexion
const mysqlConnection = require('../database');

//Aqui podemos realizar el sistema de rutas
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM ventas', (err, rows, fields) => {
        if (!err) {
            return res.json(rows);
        } else {
            console.log(err);
        }
    })
});


//Obtener ventas de un vendedor
router.get('/:id', (req, res) => {
    const id_vendedor = req.params.id;
    mysqlConnection.query('SELECT * FROM ventas WHERE vendedor_id = ?', [id_vendedor], (err, rows, fields) => {

        if (err) {
            return res.json({
                Status: false,
                msg: "Error al buscar venta"
            });
        }

        if (rows.length == 0) {
            return res.json({
                Status: false,
                msg: "No se encontro ningun vendedor con ese indice"
            });
        } else {
            return res.json(rows);
        }
    });
})


//Insertar venta
router.post('/', (req, res) => {

    const vendedor_id = req.body.id_vendedor;
    const total = req.body.total;

    const query = `
        INSERT INTO ventas (vendedor_id, total) VALUES (?, ?);
    `;

    mysqlConnection.query(query, [vendedor_id, total], (err, rows, fields) => {
        if (!err) {
            return res.json({ Status: 'Venta guardada' });
        } else {
            console.log(err);
        }
    });
});



//Modificar venta
router.put('/:id', (req, res) => {

    const vendedor_id = req.body.vendedor_id;
    const total = req.body.total;

    //id_venta
    const id = req.params.id;

    const query = `
        UPDATE ventas SET total = ?, vendedor_id = ?, fecha = CURDATE() WHERE id = ?;
        `;

    mysqlConnection.query(query, [total, vendedor_id, id], (err, rows, fields) => {
        if (!err) {
            return res.json({
                Status: 'Venta actualizada'
            })
        } else {
            console.log(err);
        }
    })
});


module.exports = router;