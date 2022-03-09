var alumnos = [
    {
      nombre: 'Juan Gomez',
      nota: 7
    }, 

    {
      nombre: 'Pedro Rodriguez',
      nota: 4
    }, 

    {
      nombre: 'Roxana García',
      nota: 8
    }, 

    {
      nombre: 'Luciano Lopez',
      nota: 5
    }, 

    {
      nombre: 'Fernanda Gimenez',
      nota: 6
    }, 

    {
      nombre: 'Florencia Martinez',
      nota: 10
    }, 

    {
      nombre: 'Raul Sanchez',
      nota: 7
    }, 

    {
      nombre: 'Sandra Figueroa',
      nota: 8
    }
  ];

alumnosAprobados = [];
alumnosDesaprobados = [];

for (i = 0; i < alumnos.length; i++) {
    if (alumnos[i].nota >= 7) {
        alumnosAprobados.push(" " + alumnos[i].nombre);
    }
    else {
        alumnosDesaprobados.push(" " + alumnos[i].nombre);
    }
}
  
document.write(`<br> Alumnos aprobados: ${alumnosAprobados} <br>`);
document.write(`<br> Alumnos desaprobados: ${alumnosDesaprobados} <br>`);