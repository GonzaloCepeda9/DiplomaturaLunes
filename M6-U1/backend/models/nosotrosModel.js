var pool = require("./bd")

/*Listar staff*/

async function getStaff() {
    var query = "select * from nosotros";
    var rows = await pool.query(query);   //Aclaro los parámetros que me tiene que traer? es decir, id, nombre, apellido, puesto, y descripción? 
    return rows;  
};

// async function insertStaff(obj) {
//     try {
//         var query = "insert into nosotros set ?";
//         var rows = await pool.query(query, [obj]);
//         return rows;
//     }

//     catch (error){
//         console.log(error);
//         throw error;
//     }
// }

module.exports = {getStaff};