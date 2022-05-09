var express = require('express');
var router = express.Router();
var usuariosModel = require("./../../models/usuariosModel"); //Necesario para la vinculación (ruteo). No es necesario incluir el require a la base de datos, porque usuariosModel ya lo tiene incluido en su primer línea de código.

/* GET home page. */
router.get('/', function(req, res, next) { //router.get: cuando hago la petición del servidor, me redirecciona a admin/login (el diseño del login + el layout)
  res.render("admin/login", {
    layout: "admin/layout"
  });
});

router.get('/logout', function(req, res, next) { //Cuando recibo /admin/logout (a través del botón de cerrar sesión)
  req.session.destroy();                         //Destruíme sesión
  res.render("admin/login", {                    //Y mostrame el login nuevamente
    layout: "admin/layout"                       //con el layout
  });
});

//Vinculación del usuariosModel:
router.post("/", async (req, res, next) => {
  try {
    var usuario = req.body.usuario;     //Generamos variable usuario. Con "req.body.usuario", captamos lo que el cliente va a colocar en el input al cuál le especificamos name="usuario" en nuestro login.hbs.
    var password = req.body.password;   //Generamos variable contraseña.

    var data = await usuariosModel.getUserByUserNameAndPassword(usuario, password); //Una vez que tengo estos 2 datos, creo una variable ("var data" en este caso), llamo a la variable creada al inicio del login.js con el ruteo, y le asigno la función creada en ese ruteo, y le paso los parámetros de las variables creadas en el try.  

    if (data != undefined) {              //Si tengo un usuario válido...
      req.session.id_usuario = data.id;   //(a req.session, le estoy asignando la info q venga
      req.session.nombre = data.usuario;  //de data {data es la que hace la query})
      res.redirect("/admin/novedades");   //...luego de hacer el proceso de seguridad redireccionalo a novedades.
    }

    else {                                //Si no,
      res.render("admin/login", {         //volvé al login,
        layout: "admin/layout",           
        error: true                       //habilitame error verdadero,
      });                                 //y mostrame el error que especifico en
    }                                     //login.hbs
  }

  catch (error) {
    console.log(error);
  }
});


module.exports = router;