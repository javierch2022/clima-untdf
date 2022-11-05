const apiClima = "https://api.open-meteo.com/v1/forecast?latitude=-54.82&longitude=-68.36&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&timezone=America%2FSao_Paulo";

function buscarPosicion(data, fecha) {
   let pos = 0
   //pos = data.hourly.time.indexOf(fecha);
   pos= data.hourly.time.indexOf(fecha);
   return pos
}

function selectImagenClima(data, fecha) {
   let ubicacion = "";
   let posicion = buscarPosicion(fecha);
   //let lluvia = data.hourly.precipitation[posicion];
   let lluvia=5;
   switch (lluvia) {
      case (lluvia < 2):
         ubicacion = "../img/icon/animated/rainy-1.svg";
         break;
      case ((lluvia >= 2) & (lluvia < 15)):
         ubicacion = "../img/icon/animated/rainy-2.svg";
         break;
      case ((lluvia >= 15) & (lluvia < 30)):
         ubicacion = "../img/icon/animated/rainy-3.svg";
         break;
      case ((lluvia >= 30) & (lluvia <= 60)):
         ubicacion = "../img/icon/animated/rain-and-sleet-mix.svg";
         break;
      case (lluvia > 60):
         ubicacion = "../img/icon/animated/severe-thunderstorm.svg";
         break;
   }
   //TEST 
   console.log(ubicacion);
   return ubicacion;
}

function llenarTabla(data, fecha) {
   let posicion = buscarPosicion(data, fecha);
   let datos = data.hourly;
   switch (posicion) {
      case (posicion > 12) & (posicion < 24):
         posicion = 13;
         break;
      case (posicion > 23) & (posicion < 48):
         posicion = 25
         break;
      case (posicion > 47) & (posicion < 72):
         posicion = 49;
         break;
      case (posicion > 71) & (posicion < 96):
         posicion = 73;
         break;
      case (posicion > 95) & (posicion < 120):
         posicion = 97;
         break;
      case (posicion > 119) & (posicion < 144):
         posicion = 121;
         break;
      case (posicion > 143) & (posicion <= 168):
         posicion = 145;
         break;
      default:
         posicion = 0;
   }
   let hora = 0;
   let tabla = document.getElementById('tabla');
   for (i = 1; i < 9; i++) {
      tabla.innerHTML += `
   <tr  class="table-secondary">
      <th scope="row">${hora}</th>
         <td>imagen</td>
         <td>${datos.temperature_2m[posicion]}</td>
         <td>${datos.apparent_temperature[posicion]}</td>
         <td>${datos.precipitation[posicion]}</td>
         <td>${datos.windspeed_10m[posicion]}</td>
   </tr>`
      hora += 3;
      posicion += 3;
   }

   return
}

function datosEnBotones(data, fecha) {
   
   return
}



function climaHoy(data, fecha) {
   let horaActual = new Date;
   let posicion = buscarPosicion(data, fecha);
   //este bloque para el dia y hora
   let dia = document.getElementById('dia')
   dia.innerHTML = `
                <div >
                   <h5>${horaActual}</h5>
                </div> `;
   //TEST console.log(posicion);
   // este bloque para el numbero de temperatura
   let temperatura = document.getElementById('temp')
   temperatura.innerHTML = `
                 <div>
                    <h2>Temperatura</h2>
                    <h1 id=temp1>${data.hourly.temperature_2m[posicion]}°</h1>
                 </div> `;
   // este bloque para la condicion del dia
   let condicion = document.getElementById('condicion')
   condicion.innerHTML = `
                  <div> 
                    <h3>Sensacion Termica</h3>
                     <h1 id="condicion1">${data.hourly.apparent_temperature[posicion]} °</h1>
                  </div>
                  <div> 
                     <h3>Precipitacion</h3>
                     <h1 id="condicion1">${data.hourly.precipitation[posicion]} %</h1>
                  </div> 
                  <div> 
                     <h3>Velocidad del Viento</h3>
                     <h1 id="condicion1">${data.hourly.windspeed_10m[posicion]} Km/h</h1>
                  </div>`;
   // este bloque para la imagen
   let ubicacion = selectImagenClima(data, fecha);
   //let ubicacion = "../img/icon/animated/rainy-1.svg";
   let imagen = document.getElementById('imagen')
   imagen.innerHTML = `
                  <div >
                     <img id= "imagen1" src=${ubicacion}>
                  </div> `;
   llenarTabla(data, fecha);
   return
}


fetch(apiClima)
   .then(response => response.json())
   .then(data => {
      // variable para la hora dia actual
      let ahora = moment().startOf('hour').format('YYYY-MM-DD\THH:mm');
      console.log(ahora);
      climaHoy(data, ahora);
   });