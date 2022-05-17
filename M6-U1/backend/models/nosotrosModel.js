var pool = require("./bd");

/*Listar staff*/

async function getStaff() {
    var query = "select * from nosotros";
    var rows = await pool.query(query);   //Aclaro los parámetros que me tiene que traer? es decir, id, nombre, apellido, puesto, y descripción? 
    return rows;  
};

/*INCORPORAR staff*/

async function incorporarStaff(obj) {
    try {
        var query = "insert into nosotros set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    }

    catch (error){
        console.log(error);
        throw error;
    }
}

/*BORRAR staff*/
async function borrarStaff(id_staff) {
    var query = "delete from nosotros where id_staff = ?";
    var rows = await pool.query(query, [id_staff]);
    return rows;
}

/*MODIFICAR staff*/
async function getStaffById(id_staff) {
    var query = "select * from nosotros where id_staff = ?";
    var rows = await pool.query(query, [id_staff]);
    return rows[0];
}

async function editarStaffById(obj, id_staff) {
    try {
        var query = "update nosotros set ? where id_staff = ?";
        var rows = await pool.query(query, [obj, id_staff]);
        return rows;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {getStaff, incorporarStaff, borrarStaff, getStaffById, editarStaffById};