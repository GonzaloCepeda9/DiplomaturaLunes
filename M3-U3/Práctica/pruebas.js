
    // 1° CREAR LISTA

    listaNumeros = [22, 43, 66, 78, 200, 18, 1009];
    

    // 2° CREAR VARIABLE INICIALIZADA EN 0

    numMayor = 0;


    // 3° CREAR EL BUCLE

    for (i = 0; i < listaNumeros.length; i++) {


        // 4° CREAR LA CONDICIÓN

        if (numMayor < listaNumeros[i]) {
            numMayor = listaNumeros[i];
        }
    }

    // 5° LECTURA DE RESULTADO

    document.write("<br>El número mayor es: " + numMayor);
