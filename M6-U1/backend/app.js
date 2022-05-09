var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require("express-fileupload"); //Creo una variable y hago un require a "express-fileupload" para que traiga esa dependencia
var cors = require("cors");

require("dotenv").config();

var session = require("express-session"); //session requiere variable de sesión (haber iniciado sesión antes)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require("./routes/admin/login");
var adminRouter = require("./routes/admin/novedades"); //adminRouter requiere de admin/novedades ?
var nosotrosRouter = require("./routes/admin/nosotros");
var apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({                           //asdf
  secret: "asdfasdfasdf",
  cookie: { maxAge: null},
  resave: false,
  saveUninitialized: true
}));

secured = async (req, res, next) => {       //
  try {
    console.log(req.session.id_usuario);    //Al iniciar sesión, se imprime el id que tiene el usuario en la base de datos (ejemplo: flavia tiene id "1"; laura tiene id "2"; etc.).

    if (req.session.id_usuario) {           //Si recibo una sesion de usuario correcta,
      next();                               //ejecuta el next y
    }
    else {
      res.redirect("/admin/login");         //me redirecciona a... admin/login
    }
  }

  catch (error) {                           //Si no, ejecuta el error especificado en login.hbs
    console.log(error)
  }
};

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/admin/login", loginRouter);
app.use("/admin/novedades", secured, adminRouter); //Cuando reciba /admin/novedades se realiza un proceso de autenticación y autorización. Si está logueado, muestra novedades, sino, vuelve a login.
app.use("/admin/nosotros", secured, nosotrosRouter); //Igual al anterior, pero con sección nosotros
app.use("/api", cors(), apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
