const apiClima = "https://api.open-meteo.com/v1/forecast?latitude=-54.82&longitude=-68.36&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&timezone=America%2FSao_Paulo";

function buscarPosicion(data,fecha){
   let pos=0
   let hora
   for (i=0;i<data.hourly.time.length;i++){
      hora=data.hourly.time[i];
      if (hora==fecha)
         pos=i;
   }
   //data.hourly.time.forEach(element=>{pos=element.indexOf(fecha)})   
   return pos
}


fetch(apiClima)
   .then(response => response.json())
   .then(data => {
      // TEST : llamados de lista json
      /*console.log(data.hourly.time[0]);
      console.log(data.hourly.temperature_2m[0]);
      console.log(data.hourly.apparent_temperature[0]);
      console.log(data.hourly.precipitation[0]);
      console.log(data.hourly.windspeed_10m[0]);*/

      // variable es para la hora dia actual
      let horaActual = new Date;
      let ahora = moment().startOf('hour').format('YYYY-MM-DD\THH:mm'); 

      // TEST:console.log(horaActual);
      //console.log(ahora);
      //este bloque para el dia y hora
      let dia = document.getElementById('dia')
      dia.innerHTML = `
                <div >
                   <h5>${horaActual}</h5>
                </div> `;
      let posicion=buscarPosicion(data,ahora);
      console.log(posicion);
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
      let imagen = document.getElementById('imagen')
      imagen.innerHTML = `
                  <div >
                     <img id= "imagen1" src="../img/icon/animated/cloudy-2-day.svg">
                  </div> `

   });