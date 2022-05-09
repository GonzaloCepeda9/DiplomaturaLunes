//Los archivos "models" interactúan directamente con la base de datos (a través del query, utilizando select, insert, etc.)

var pool = require("./bd"); //Llamado a la Base de Datos.
var md5 = require("md5");   //Ésta dependencia, encripta la contraseña (por seguridad).

async function getUserByUserNameAndPassword(user, password) {
    try {
        var query = "select * from usuarios where usuario = ? and password = ? limit 1";
        var rows = await pool.query(query, [user, md5(password)]); //await pool query trae la información de la query, del user, y del password(con la previa función md5).
        return rows[0];
    }
    catch (error) {
        console.log("error");
    }
}

module.exports = {getUserByUserNameAndPassword}; //Cuando el usuario coloca sus datos, esto se conecta con el login.js