const express = require('express');
//Creara un objeto para poder definir trutas
const router = express.Router();

//Requerimos conexion
const mysqlConnection = require('../database');

//Aqui podemos realizar el sistema de rutas
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM productos', (err, rows, fields) => {
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
    mysqlConnection.query('SELECT * FROM productos WHERE id = ?', [id], (err, rows, fields) => {

        if (err) {
            return res.json({
                Status: false,
                msg: "Error al buscar producto"
            });
        }

        if (rows.length == 0) {
            return res.json({
                Status: false,
                msg: "No se encontro ningun producto"
            });
        } else {
            return res.json(rows[0]);
        }

    });
})


//Insertar dato
router.post('/', (req, res) => {

    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stock = req.body.stock;

    const query = `
        INSERT INTO productos VALUES (NULL, ?, ?, ?, ?);
    `;

    mysqlConnection.query(query, [nombre, descripcion, precio, stock], (err, rows, fields) => {
        if (!err) {
            return res.json({ Status: 'Producto guardado' });
        } else {
            console.log(err);
        }
    });
});

router.put('/:id', (req, res) => {

    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const id = req.param.id;

    const query = `
        UPDATE productos SET nombre = ?, descripcion = ?, precio_venta = ?, stock = ? WHERE id = ?;
        `;

    mysqlConnection.query(query, [nombre, descripcion, precio, stock, id], (err, rows, fields) => {
        if (!err) {
            return res.json({
                Status: 'Producto actualizado'
            })
        } else {
            console.log(err);
        }
    })

});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM productos WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            return res.json({ Status: 'Producto Eliminado' });
        } else {
            console.log(err);
        }
    });
});



module.exports = router;