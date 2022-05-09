var express = require('express');
var router = express.Router();
var nosotrosModel = require("./../../models/nosotrosModel");

//Mostrar staff
router.get("/", async function(req, res, next) {
    
    var nosotros = await nosotrosModel.getStaff();

    res.render("admin/nosotros", {
        layout: "admin/layout",
        usuario: req.session.nombre,
        nosotros
    });
});

//Agregar personas al staff

module.exports = router;