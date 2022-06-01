let inputNumbers = document.getElementById('inputNumbers');
let parrafo = document.getElementById('parrafo');
let Numbers = [];
let Historial = [];
let currentValue = 0;
let operacion;
let estado = false;
let useBorrar = false;

const cargarHistorial = () => {
    let historial = JSON.parse(localStorage.getItem('Historial'));
    let tableBody = document.getElementById('tablaBody');
    tableBody.innerHTML = '';
   
    historial.map(dato => {
        let fila = document.createElement('tr');
        let operacion = document.createElement('td');
        let resultado = document.createElement('td');

        operacion.innerText = dato.operacion;
        resultado.innerText = dato.resultado;

        fila.appendChild(operacion);
        fila.appendChild(resultado);
        tableBody.appendChild(fila);
    })
}

const setNumbers = (number) => {

    if(currentValue !== 0 && inputNumbers.value === ''){
        Numbers = [];
    }

    if(Numbers.length < 12){
        Numbers.push(number);
    }

    if(useBorrar !== false){
        inputNumbers.value = Numbers.join('');
        Numbers = Array.from(inputNumbers.value.replaceAll(',', ''));
        Numbers = Array.from(igualComa(Numbers.join('')));

        useBorrar = false;
    }else{
        switch(Numbers.length){
            case 4:
                Numbers.splice(1, 0, ',');
                break;
            case 6:
                Numbers = Array.from(String(Numbers).replaceAll(',', ''));
                Numbers.splice(2, 0, ',');
                break;
            case 7:
                Numbers = Array.from(String(Numbers).replaceAll(',', ''));
                Numbers.splice(3, 0, ',');
                break;
            case 8:
                Numbers = Array.from(String(Numbers).replaceAll(',', ''));
                Numbers.splice(1, 0, ',');
                Numbers.splice(5, 0, ',');
                break;
            case 10:
                Numbers = Array.from(String(Numbers).replaceAll(',', ''));
                Numbers.splice(2, 0, ',');
                Numbers.splice(6, 0, ',');
                break;
            case 11:
                Numbers = Array.from(String(Numbers).replaceAll(',', ''));
                Numbers.splice(3, 0, ',');
                Numbers.splice(7, 0, ',');
                break;
            case 12:
                Numbers = Array.from(String(Numbers).replaceAll(',', ''));
                Numbers.splice(1, 0, ',');
                Numbers.splice(5, 0, ',');
                Numbers.splice(9, 0, ',');
                break;
        }
    }
    
    inputNumbers.value = Numbers.join('');
}

const sumar = () => {

    if(estado === false){
        currentValue = parseInt(String(inputNumbers.value).replaceAll(',', ''));
        estado = true;
    }else if(estado === true && inputNumbers.value === ''){
        alert('Ya has elegido una operación')
    }else{
        let value = igualComa(currentValue + parseInt(String(inputNumbers.value).replaceAll(',', '')));
        Historial.push({operacion: igualComa(currentValue) + '+' + inputNumbers.value, resultado : value});
        localStorage.setItem('Historial', JSON.stringify(Historial));
        currentValue =  currentValue + parseInt(String(inputNumbers.value).replaceAll(',', ''));
    }

    inputNumbers.value = '';
    operacion = 'sumar';
}

const restar = () => {

    if(estado === false){
        currentValue = parseInt(String(inputNumbers.value).replaceAll(',', ''));

        estado = true;
    }else if(estado === true && inputNumbers.value === ''){
        alert('Ya has elegido una operación')
    }else{
        let value = igualComa(currentValue - parseInt(String(inputNumbers.value).replaceAll(',', '')));
        Historial.push({operacion: igualComa(currentValue) + '-' + inputNumbers.value, resultado : value});
        localStorage.setItem('Historial', JSON.stringify(Historial));
        currentValue =  currentValue - parseInt(String(inputNumbers.value).replaceAll(',', ''));
    }

    inputNumbers.value = '';
    operacion = 'restar';
}

const multiplicar = () => {

    if(estado === false){
        currentValue = parseInt(String(inputNumbers.value).replaceAll(',', ''));

        estado = true;
    }else if(estado === true && inputNumbers.value === ''){
        alert('Ya has elegido una operación')
    }else{
        let value = igualComa(currentValue * parseInt(String(inputNumbers.value).replaceAll(',', '')));
        Historial.push({operacion: igualComa(currentValue) + 'x' + inputNumbers.value, resultado : value});
        localStorage.setItem('Historial', JSON.stringify(Historial));
        currentValue =  currentValue * parseInt(String(inputNumbers.value).replaceAll(',', ''));
    }

    inputNumbers.value = '';
    operacion = 'multiplicar';
}

const dividir = () => {

    if(estado === false){
        currentValue = parseInt(String(inputNumbers.value).replaceAll(',', ''));

        estado = true;
    }else if(estado === true && inputNumbers.value === ''){
        alert('Ya has elegido una operación')
    }else{
        let value = igualComa(currentValue / parseInt(String(inputNumbers.value).replaceAll(',', '')));
        Historial.push({operacion: igualComa(currentValue) + '÷' + inputNumbers.value, resultado : value});
        localStorage.setItem('Historial', JSON.stringify(Historial));
        currentValue =  currentValue / parseInt(String(inputNumbers.value).replaceAll(',', ''));
    }

    inputNumbers.value = '';
    operacion = 'dividir';
}

const igual = () => {

    if(operacion === 'sumar' && estado === true && inputNumbers.value !== ''){     
        Historial.push({operacion: igualComa(currentValue) + '+' + inputNumbers.value, resultado : igualComa(currentValue + parseInt(String(inputNumbers.value).replaceAll(',', '')))});
        currentValue = currentValue + parseInt(String(inputNumbers.value).replaceAll(',', ''));   
        inputNumbers.value = igualComa(currentValue);
        localStorage.setItem('Historial', JSON.stringify(Historial));
    }else if(operacion === 'restar' && estado === true && inputNumbers.value !== ''){
        Historial.push({operacion: igualComa(currentValue) + '-' + inputNumbers.value, resultado : igualComa(currentValue - parseInt(String(inputNumbers.value).replaceAll(',', '')))});
        currentValue = currentValue - parseInt(String(inputNumbers.value).replaceAll(',', ''));
        inputNumbers.value = igualComa(currentValue);
        localStorage.setItem('Historial', JSON.stringify(Historial));
    }else if(operacion === 'multiplicar' && estado === true && inputNumbers.value !== ''){
        Historial.push({operacion: igualComa(currentValue) + 'x' + inputNumbers.value, resultado : igualComa(currentValue * parseInt(String(inputNumbers.value).replaceAll(',', '')))});
        currentValue = currentValue * parseInt(String(inputNumbers.value).replaceAll(',', ''));
        inputNumbers.value = igualComa(currentValue);
        localStorage.setItem('Historial', JSON.stringify(Historial));
    }else if(operacion === 'dividir' && estado === true && inputNumbers.value !== ''){
        Historial.push({operacion: igualComa(currentValue) + '÷' + inputNumbers.value, resultado : igualComa(currentValue / parseInt(String(inputNumbers.value).replaceAll(',', '')))});
        currentValue = currentValue / parseInt(String(inputNumbers.value).replaceAll(',', ''));
        inputNumbers.value = igualComa(currentValue);
        localStorage.setItem('Historial', JSON.stringify(Historial));
    }else{
        alert('Ya se ha realizado la operación')
    }
    estado = false;
}

const resetiar = () => {
    inputNumbers.value = '';
    currentValue = 0;
    operacion = '';
    estado = false;
    Numbers = [];
}

const limpiarHistorial = () => {
    localStorage.clear();
    cargarHistorial();
}

const borrar = () => {
    Numbers = Array.from(inputNumbers.value.replaceAll(',', ''));
    Numbers.pop();
    
    inputNumbers.value = igualComa(Numbers.join(''));
    
    useBorrar = true;
}

const igualComa = (calculo) => {
    if(typeof(calculo) != Object){
        calculo = Array.from(String(calculo));
    }
    
    switch(calculo.length){
        case 4:
            calculo.splice(1, 0, ',');
            break;
        case 5:
            calculo.splice(2, 0, ',');
            break;
        case 6:
            calculo.splice(3, 0, ',');
            break;
        case 7:
            calculo.splice(1, 0, ',');
            calculo.splice(5, 0, ',');
            break;
        case 8:
            calculo.splice(2, 0, ',');
            calculo.splice(6, 0, ',');
            break;
        case 9:
            calculo.splice(3, 0, ',');
            calculo.splice(7, 0, ',');
            break;
        case 10:
            calculo.splice(1, 0, ',');
            calculo.splice(5, 0, ',');
            calculo.splice(9, 0, ',');
            break;
    }

    return calculo.join(''); 
}