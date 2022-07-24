//Constantes con datos de las URL:
const peliculasURL = "https://nohaywebs.com/esm/peliculas-populares.json";
const configuracionURL = "https://nohaywebs.com/esm/configuration.json";

//HECHA POR MI:
/*
//El await: Como no se sabe cuanto tarda, esperamos nosotros a que termine.
//Función async
async function obtenerDatos(){
    //1.Películas:
    // Con el fetch se manda una petición que no ves. Luego te devuelve el response.
    // Request (solo el fetch):
    const respuestaPeliculas = await fetch(peliculasURL);
    // Response:
    //console.log(respuestaPeliculas);
    // json() -->conviertes los datos de la respuesta en json.
    const datosPeliculas = await respuestaPeliculas.json();
    // Console:
    console.log(datosPeliculas);

    // 2. Configuración:
    // Request (el fetch):
    const respuestaConfiguracion = await fetch(configuracionURL);
    // Response: 
    //console.log(respuestaConfiguracion);
    // Convertir datos en json
    const datosConfiguracion = await respuestaConfiguracion.json();
    // Console:
    console.log(datosConfiguracion);
}
obtenerDatos();*/

/*
//HECHA POR EL PROFE:
async function obtenerDatos(){
    //PELÍCULAS:
    const respuestaPeliculas = await fetch (peliculasURL);
    const datosPeliculas = await respuestaPeliculas.json();
    console.log(datosPeliculas);
    //CONFIGURACIÓN:
    const respuestaConfiguracion = await fetch(configuracionURL);
    const datosConfiguracion = await respuestaConfiguracion.json();
    console.log(datosConfiguracion)
}
obtenerDatos();*/

//HECHA POR EL PROFE AVANZADO:
async function fetchJSON(URL) {
    const respuesta = await fetch(URL);
    const datos = await respuesta.json();
    return datos;
}
/*
async function obtenerDatos(){
    //PELÍCULAS:
    // Se pone el await aquí porque la función grande (fetchJSON()) tiene que esperar por las funciones mas pqueñas que tiene dentro (fetch y json).
    // Si no pones await se queda como Promise, pendiente:
    const peliculas = await fetchJSON(peliculasURL);
    console.log(peliculas);
    //CONFIGURACIÓN:
    const configuracion = await fetchJSON(configuracionURL);
    console.log(configuracion);
    //console.log(peliculas, configuracion); //--> Para que se vea las dos constantes en la misma línea
}
obtenerDatos();*/

/*// Misma función que la anterior pero más clara: 
async function obtenerDatos() {
    //PELÍCULAS:
    console.log("<-- PELÍCULAS -->");
    const peliculas = await fetchJSON(peliculasURL);
    //Results --> Donde está el array con las películas:
    console.log("<-- array results -->");
    console.log(peliculas.results)
    // Objeto primera película
    console.log("<-- Objeto primera película -->");
    console.log(peliculas.results[0]);
    // 
    console.log("<-- Título película -->");
    console.log(peliculas.results[2].title);
    // imagen --> Poster_path (dirección de imagen)
    console.log("<-- poster_path -->");
    console.log(peliculas.results[0].poster_path);
    //CONFIGURACIÓN:
    console.log("<-- CONFIGURACIÓN -->");
    const configuracion = await fetchJSON(configuracionURL);
    console.log(configuracion);
    // Base URL
    console.log(configuracion.images.base_url);
    // Poster Size
    console.log(configuracion.images.poster_sizes[0]);
}
obtenerDatos();*/

//Mas modificiaciones a función anterior:
/*
async function obtenerDatos() {
    //PELÍCULAS:
    const peliculas = await fetchJSON(peliculasURL);
    console.log(peliculas);
    //CONFIGURACIÓN:
    const configuracion = await fetchJSON(configuracionURL);
    console.log(configuracion);
    // Constantes con las direcciones que queremos, para construir una imagen (primero la base de la URL, luego el tamaño de la imagen y al final la dirección de la imagen):
    // Hay que mirar en los arrays pelicuas y configuración, ya que esta API te lo divide por partes (lo de abajo para construir la imagen)

    const baseURL = configuracion.images.base_url;
    const posterSize = configuracion.images.poster_sizes[6];
    const poster = peliculas.results[8].poster_path;
    // Const para el logo:
    const logoSize = configuracion.images.logo_sizes[3];

    // Muestra por consola la imagen:
    console.log("<--- URL IMAGEN PÓSTER - PELÍCULA --->");
    console.log(baseURL + posterSize + poster);
    console.log("<--- URL IMAGEN LOGO - PELÍCULA --->")
    console.log(baseURL + logoSize + poster);


    //imagenes: 
    const posterSizeGlobal = configuracion.images.poster_sizes[3];
    const direccionImagen = peliculas.results.poster_path;
    //map siempre devuelve array:
    // peliculas.results para que haga referencia al array results.
    let listaPeliculas = peliculas.results
    .map(x =>
    `<div id="contenedor">
        <div class="ficha-peliculas">
            <img src="${baseURL}${posterSizeGlobal}${x.poster_path}"alt="">
            <h2>${x.title}</h2>
            <p>${x.overview}</p>
        </div>
    </div>`)
    .join("\n");
    document.getElementById("contenedor").innerHTML = listaPeliculas;
}
obtenerDatos();*/

//POR EL PROFE - FINAL:
async function obtenerDatos() {
    //PELÍCULAS:
    const peliculas = await fetchJSON(peliculasURL);
    console.log(peliculas);
    //CONFIGURACIÓN:
    const configuracion = await fetchJSON(configuracionURL);
    console.log(configuracion);


    const baseURL = configuracion.images.base_url;
    const posterSize = configuracion.images.poster_sizes[3];

    document.getElementById("controles").innerHTML = 
        `<div id="controles">
            <input onkeyup="actualizarLista()" type="text" name="barra-busqueda" id="barra-busqueda"><br>
            <button onclick="nombreAscendente()">Nombre Asc</button>
            <button onclick="nombreDescendente()">Nombre Des</button><br>
        </div>`;

    document.getElementById("contenedor").innerHTML =
    peliculas.results.map(
        pelicula =>
        `<div class="ficha-peliculas">
                <img src="${baseURL + posterSize + pelicula.poster_path}"alt="">
                <h2>${pelicula.title}</h2>
                <span>${pelicula.release_date.substring(0,4)}</span>
                <p>${pelicula.overview}</p>
        </div>`)
    .join("\n");

    
}
obtenerDatos();