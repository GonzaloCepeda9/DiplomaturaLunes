//Los archivos "models" interactúan directamente con la base de datos (a través del query, utilizando select, insert, etc.)

var pool = require("./bd");

/*Listar novedades*/

async function getNovedades() {
    var query = "select * from novedades order by id desc";
    var rows = await pool.query(query);
    return rows;
};

/*Insertar novedades*/
async function insertNovedad(obj) {
    try {
        var query = "insert into novedades set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    }

    catch (error) {
        console.log(error);
        throw error;
    }
}

/*Eliminar novedades*/
async function eliminarNovedad(id) {
    var query = "delete from novedades where id = ?";
    var rows = await pool.query(query, [id]);
    return rows
}


/*Modificar novedades (traer novedad por id, y luego update para modificar)*/
async function getNovedadById(id) {
    var query = "select * from novedades where id = ?";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarNovedadById(obj, id) {
    try {
        var query = "update novedades set ? where id = ?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }
    catch (error) {
        throw error;
    }
};




module.exports = {getNovedades, insertNovedad, eliminarNovedad, getNovedadById, modificarNovedadById};

