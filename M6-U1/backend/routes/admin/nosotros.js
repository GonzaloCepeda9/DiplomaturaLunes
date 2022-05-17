var express = require("express");
var router = express.Router();
var nosotrosModel = require("./../../models/nosotrosModel");
var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

//Inicio de MOSTRAR staff

router.get("/", async function (req, res, next) {
  var nosotros = await nosotrosModel.getStaff();

  nosotros = nosotros.map((persona) => {
    if (persona.img_staff) {
      const imagen = cloudinary.image(persona.img_staff, {
        width: 100,
        height: 100,
        crop: "fill",
      });
      return {
        ...persona,
        imagen,
      };
    } else {
      return {
        ...persona,
        imagen: "No se pudo cargar la imagen.",
      };
    }
  });

  res.render("admin/nosotros", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    nosotros,
  });
});

//Fin de MOSTRAR staff

//Inicio de AÑADIR staff

router.post("/incorporar", async (req, res, next) => {
  try {
    var img_staff = "";

    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_staff = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (
      req.body.nombre != "" &&
      req.body.puesto != "" &&
      req.body.descripcion != ""
    ) {
      await nosotrosModel.incorporarStaff({
        ...req.body,
        img_staff,
      });

      res.redirect("/admin/nosotros");
    } else {
      res.render("/admin/incorporar", {
        layout: "admin/layout",
        error: true,
        message: "Debe completar todos los datos.",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/incorporar", {
      layout: "admin/layout",
      error: true,
      message: "No se pudo añadir al staff.",
    });
  }
});

router.get("/incorporar", (req, res, next) => {
  res.render("admin/incorporar", {
    layout: "admin/layout",
  });
});

router.get("/incorporar", (req, res, next) => {
  res.render("admin/incorporar", {
    layout: "admin/layout",
  });
});

//Fin de AÑADIR staff

//Inicio de BORRAR staff

router.get("/borrar/:id_staff", async (req, res, next) => {

  var id_staff = req.params.id_staff;

  let persona = await nosotrosModel.getStaffById(id_staff);
  if (persona.img_staff) {
      await (destroy(persona.img_staff));
  }

  await nosotrosModel.borrarStaff(id_staff);
  res.redirect("/admin/nosotros");
});

//Fin de BORRAR staff

//Inicio de EDITAR staff

router.get("/editar/:id_staff", async (req, res, next) => {
  let id_staff = req.params.id_staff;
  let persona = await nosotrosModel.getStaffById(id_staff); //Cambiar variable nosotros a persona
  res.render("admin/editar", {
    layout: "admin/layout",
    persona
  });
});

router.post("/editar", async (req, res, next) => {
  try {
    let img_staff = req.body.img_original;
    let borrar_img_vieja = false;

    if (req.body.img_delete === "1") {
      img_staff = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_staff = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }

    if (borrar_img_vieja && req.body.img_original) {
      await destroy(req.body.img_original);
    }

    let obj = {
      img_staff,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      puesto: req.body.puesto,
      descripcion: req.body.descripcion
    };

    await nosotrosModel.editarStaffById(obj, req.body.id_staff);
    res.redirect("/admin/nosotros");
  } catch (error) {
    // console.log(error)
    res.render("admin/editar", {
      layout: "admin/layout",
      error: true,
      message: "No se pudo editar el staff.",
    });
  }
});
//Fin de EDITAR staff

module.exports = router;
