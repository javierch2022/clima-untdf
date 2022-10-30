const apiClima = "https://api.open-meteo.com/v1/forecast?latitude=-54.82&longitude=-68.36&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&timezone=America%2FSao_Paulo";




fetch(apiClima)
        .then(response => response.json())
        .then(data => {

                console.log(data.hourly.time[0]);
                console.log(data.hourly.temperature_2m[0]);
                console.log(data.hourly.apparent_temperature[0]);
                console.log(data.hourly.precipitation[0]);
                console.log(data.hourly.windspeed_10m[0]);


                let horaActual = new Date;
                
                console.log(horaActual)
                //este bloque para el dia y hora
                let dia = document.getElementById('dia')
                dia.innerHTML = `
                <div >
                   <h5>${horaActual}</h5>
                </div> `;
                // este bloque para el numbero de temperatura
                let temperatura = document.getElementById('temp')
                temperatura.innerHTML = `
                 <div id="temp1">
                    <h3>Temperatura</h3>
                    <h1>${data.hourly.temperature_2m[0]}</h1>
                 </div> `;
                // este bloque para la condicion del dia
                let condicion = document.getElementById('condicion')
                condicion.innerHTML = `
                  <div> 
                    <h3>Sensacion Termica</h3>
                     <h1 id="condicion1">${data.hourly.apparent_temperature[0]}</h1>
                  </div>
                  <div> 
                     <h3>Precipitacion</h3>
                     <h1 id="condicion1">${data.hourly.precipitation[0]}</h1>
                  </div> 
                  <div> 
                     <h3>Velocidad del Viento</h3>
                     <h1 id="condicion1">${data.hourly.windspeed_10m[0]}</h1>
                  </div>`;
                   // este bloque para la imagen
                let imagen = document.getElementById('imagen')
                imagen.innerHTML = `
                  <div >
                     <img id= "imagen1" src="../img/icon/animated/cloudy-2-day.svg">
                  </div> `
        
        });