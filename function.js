const apiClima = "https://api.open-meteo.com/v1/forecast?latitude=-54.82&longitude=-68.36&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&timezone=America%2FSao_Paulo";

function buscarPosicion(data, fecha) {
   let pos = 0
   pos = data.hourly.time.indexOf(fecha);
   return pos
}

function selectImagenClima(data, fecha) {
   let ubicacion = "";
   let posicion = buscarPosicion(data, fecha);
   let lluvia = data.hourly.precipitation[posicion];

   switch (true) {
      case (lluvia < 1):
         ubicacion = "./img/icon/animated/clear-day.svg";
         break;
      case ((lluvia < 2) && (lluvia > 1)):
         ubicacion = "./img/icon/animated/rainy-1.svg";
         break;
      case ((lluvia >= 2) && (lluvia < 15)):
         ubicacion = "./img/icon/animated/rainy-2.svg";
         break;
      case ((lluvia >= 15) && (lluvia < 30)):
         ubicacion = "./img/icon/animated/rainy-3.svg";
         break;
      case ((lluvia >= 30) && (lluvia <= 60)):
         ubicacion = "./img/icon/animated/rain-and-sleet-mix.svg";
         break;
      case (lluvia > 60):
         ubicacion = "./img/icon/animated/severe-thunderstorm.svg";
         break;
   }
   //TEST 
   //console.log(ubicacion);
   return ubicacion;
}

function llenarTabla(data, fecha) {
   let posicion = buscarPosicion(data, fecha);
   let datos = data.hourly;
   //cambio posicion al inicio del dia correspondiente
   switch (true) {
      case (posicion > 12) && (posicion < 24):
         posicion = 13;
         console.log("1")
         break;
      case (posicion > 23) && (posicion < 48):
         posicion = 25
         console.log("2")
         break;
      case (posicion > 47) && (posicion < 72):
         posicion = 49;
         console.log("3")
         break;
      case (posicion > 71) && (posicion < 96):
         posicion = 73;
         console.log("4")
         break;
      case (posicion > 95) && (posicion < 120):
         posicion = 97;
         console.log("5")
         break;
      case (posicion > 119) && (posicion < 144):
         posicion = 121;
         console.log("6")
         break;
      case (posicion > 143) && (posicion <= 168):
         posicion = 145;
         console.log("7")
         break;
      default:
         posicion = 0;
   }
   let hora = 0;
   //lleno la tabla
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
      //voy cambiando la hora y la posicion para tomar los datos siguientes (cada 3 hs)
      hora += 3;
      posicion += 3;
   }

   return
}

function obtenerDiaSemana(numDia) {
   let dia;
   const dias = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
   ];
   if (numDia >= 7) {
      numDia = numDia - 7
   };
   dia = dias[numDia];
   return dia;
}

function datosEnCards(data, fecha) {
   let numeroDia = new Date(fecha).getDay() + 1;
   const idcard = ["card1", "card2", "card3", "card4", "card5", "card6"];
   //consigo la posicion de mañana 
   let dato = data.hourly;
   let posicion = buscarPosicion(data, fecha) + 24;
   // creo las cards de los dias siguientes

   let card = document.getElementById('section3');
   for (i = 1; i < 7; i++) {
      console.log(idcard[i - 1]);
      dia = obtenerDiaSemana(numeroDia);
      //cambio la fecha al dia siguiente para seleccionar la imagen
      fecha = dato.time[posicion];
      let imagen = selectImagenClima(data, fecha);
      //cards
      card.innerHTML += `        
      <div id= ${idcard[i-1]} class="card" type="button" >
                  <div class="card-body">
                      <h5 class="card-title">${dia}</h5><br>
                      <img id= "test" src=${imagen} class="card-img-top" alt="...">
                      <h1>${dato.temperature_2m[posicion]}</h1>
                  </div>
      </div>
                    `
      //cambio la posicion 24 hs y paso al dia siguiente
      posicion += 24;
      numeroDia += 1;
   }
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
   let imagen = document.getElementById('imagen')
   imagen.innerHTML = `
                  <div >
                     <img id= "imagen1" src=${ubicacion}>
                  </div> `;
   llenarTabla(data, fecha);
   return
}

function eventoClick(data, fecha) {
   document.querySelectorAll(".card").forEach(element => {
      element.addEventListener("click", elemento => {
         const id = elemento.target.getAttribute("id"); 
         console.log(id);
         switch (id) {
            case "card1":
               let undia = moment().add(1, 'd').startOf('hour').format('YYYY-MM-DD\THH:mm');
               llenarTabla(data, undia);
               console.log(undia);
               break;
            case "card2":
               let dosdias = moment().add(2, 'd').startOf('hour').format('YYYY-MM-DD\THH:mm');
               llenarTabla(data, dosdias);
               console.log(dosdias);
               break;
            case "card3":
               let tresdias = moment().add(3, 'd').startOf('hour').format('YYYY-MM-DD\THH:mm');
               llenarTabla(data, tresdias);
               console.log(tresdias);
               break;
            case "card4":
               let cuatrodias = moment().add(4, 'd').startOf('hour').format('YYYY-MM-DD\THH:mm');
               llenarTabla(data, cuatrodias);
               console.log(cuatrodias);
               break;
            case "card5":
               let cincodias = moment().add(5, 'd').startOf('hour').format('YYYY-MM-DD\THH:mm');
               llenarTabla(data, cincodias);
               console.log(cincodias);
               break;
            case "card6":
               let seisdias = moment().add(6, 'd').startOf('hour').format('YYYY-MM-DD\THH:mm');
               llenarTabla(data, seisdias);
               console.log(seisdias);
               break;
            default: llenarTabla(data,fecha);
         }

      })
   })
   
}

fetch(apiClima)
   .then(response => response.json())
   .then(data => {
      // variable para la hora dia actual
      let ahora = moment().startOf('hour').format('YYYY-MM-DD\THH:mm');
      climaHoy(data, ahora);
      datosEnCards(data, ahora);
      eventoClick(data,ahora);
      });