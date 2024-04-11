let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = '1d9a8cc55f76ce21e3d0e1dc91e5b918'
let difKelvin = 273.15

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
    if(ciudad){
        fetchDatosClima(ciudad)
    }
})

function fetchDatosClima(ciudad) {
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
        .then(data => data.json())
        .then(data => mostrarDatosClima(data))
}

function mostrarDatosClima(data){
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML =''

    const ciudadNombre = data.name
    const paisNombre = data.sys.country
    const temperatura = data.main.temp
    const humedad = data.main.humidity
    let descripcion = data.weather[0].description
    const icono = data.weather[0].icon

    switch (descripcion) {
        case 'clear sky':
            descripcion = 'cielo claro';
            break;
        case 'few clouds':
            descripcion = 'Parcialmente nublado';
            break;
        case 'scattered clouds':
            descripcion = 'Nubes dispersas';
            break;
        case 'broken clouds':
            descripcion = 'Llovizna ligera';
            break;
        case 'shower rain':
            descripcion = 'Diluvio';
            break;
        case 'rain':
            descripcion = 'Lloviendo';
            break;
        case 'thunderstorm':
            text = 'tormentas electricas';
            break;
        case 'snow':
            descripcion = 'Nevando';
            break;
        case 'mist':
            descripcion = 'Neblina';
            break;
        default:
            descripcion = '';
    }

    const ciudadTitulo = document.createElement('h2')
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`

    const temperaturaInfo = document.createElement('p')
    temperaturaInfo.textContent = `Temperatura: ${Math.floor(temperatura - difKelvin)} °C`
    const humedadInfo = document.createElement('p')
    humedadInfo.textContent = `Humedad: ${humedad} %`

    const iconoInfo = document.createElement('img')
    iconoInfo.src =`https://openweathermap.org/img/wn/${icono}@2x.png`
    
    const descriptionInfo = document.createElement('p')
    descriptionInfo.textContent = descripcion

    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(temperaturaInfo)
    divDatosClima.appendChild(humedadInfo)
    divDatosClima.appendChild(descriptionInfo)
    divDatosClima.appendChild(iconoInfo)
}

