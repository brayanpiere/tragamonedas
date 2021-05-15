//JUEGO - INSTALACION =========
var maquinas;
var apuesta;
var apuesta2;
var ganancia_m;

function bernoulli(p) {
    return 1 && (Math.random() < p) || 0
}
function getRewards(p, max) {
    var reward = 0
    for (var i = 0; i < max; i++) {
        reward += bernoulli(p)
    }
    return reward
}
function debugResult(p, tries, maxRewards) {
    var rewards = []
    var sum = 0
    for (var i = 0; i < tries; i++) {
        var r = getRewards(p, maxRewards)
        rewards.push(r)
        sum += r
    }
    console.log(rewards, sum, sum / tries)
}
function get2Randoms(options) {
    var r1 = Math.floor(Math.random() * options.length)
    var result1 = options.splice(r1, 1)
    var r2 = Math.floor(Math.random() * options.length)
    var result2 = options.splice(r2, 1)
    return [result1[0], result2[0]]
}
function getResultNoReward() {
    return get2Randoms(['J', 'Q', 'K', 'A']).join('')
}
function getResult(p) {
    var rewards = []
    var sum = 0
    var maxRewards = 10
    var tries = 5
    var results = [
        '', '', 'JJ', 'QQ', 'KK', '', '', 'AA'
    ]
    var r = getRewards(p, maxRewards)
    var result = results[r < results.length ? r : 0]
    if (result == '') {
        return getResultNoReward()
    }
    return result
}
function getWin(result) {
    var results = {
        'JJ': 2, 'QQ': 3, 'KK': 4, 'AA': 10
    }
    var win = results[result]
    return win || 0
}
function getDistributions() {
    return get2Randoms([0.2, 0.4])
}

function apostarYJugar(maquina, apuesta) {
    var resultado = getResult(maquina)
    var ganancia = getWin(resultado)
    ganancia_m = ganancia;
    return {
        resultado,
        ganancia
    }
}

function imprimirIntento(i, maquina, intento) {
    console.log(
        i + '-',
        maquina + ':',
        intento.resultado,
        intento.ganancia,
        intento.ganancia * apuesta
    )
    console.log(intento.resultado[0]);
    console.log(intento.resultado[1]);
}
//JUEGO - INICIO ===============================
/*
var distribuciones = getDistributions()
console.log(distribuciones)
//0.4 significa que tiene más probabilidades de ganar que 0.2
var maquinas = {
    maquinaA: distribuciones[0],
    maquinaB: distribuciones[1]
}
var i = 2
var maquina = 'maquinaB'
var apuesta = 100
var intento = apostarYJugar(maquinas[maquina])
imprimirIntento(i, maquina, intento)
*/
/*
//JUGAR ========================================
//INTENTO 1
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 1
var maquina = 'maquinaA'
var apuesta = 10
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)

*/

//INTENTO 2
//PRESIONAR EL BOTON DE UNA MAQUINA


//AQUI COMIENZA CODIGO NUEVO

var nombreJugador;
var modalBienvenida;
var modalInstrucciones;
var modalAcercaDe;
var modalRanking;
var cobrar_m1 = false;
var cobrar_m2 = false;


var num_apuesta = 0;

var ganancia_maq1;
var ganancia_maq2;

var ganancia_acumulada = 0;

var monedas = 200;
var flagSonido = false;
var animal =
    ["cabra", "iguana", "koala", "lémur", "cocodrilo",
        "oso", "dinosaurio", "delfines", "pato", "elefante",
        "hurón", "zorro", "rana", "jirafa", "erizo", "hipopótamo", "hiena",
        "chacal", "leopardo", "tigre", "llama", "manatí", "visón", "mono",
        "orangután", "nutria", "panda", "pingüino", "armadillo", "axolote",
        "tejón", "murciélago", "castor", "búfalo", "camello", "camaleón",
        "guepardo", "ardilla", "chinchilla", "chupacabras", "cormorán",
        "coyote", "cuervo", "dingo", "ornitorrinco", "pitón", "conejo",
        "mapache", "rinoceronte", "oveja", "musaraña", "mofeta", "ardilla",
        "tortuga", "morsa", "lobo", "taltuza"];

const cargarModalBienvenida = () => {
    modalBienvenida.toggle();
    let n = Math.floor(Math.random() * (animal.length - 0)) + 0
    console.log(n);
    console.log(animal[n]);
    document.querySelector("#input-nombre").value = animal[n];
    document.querySelector("#input-nombre").focus();
    document.querySelector("#user").textContent = animal[n];
}

const cargarIntrucciones = () => {
    modalInstrucciones.toggle();
}

const cargarAcercaDe = () => {
    modalAcercaDe.toggle();
}

const cargarRanking = () => {
    modalRanking.toggle();
}

const comenzar = () => {

    const inputNombre = document.querySelector("#input-nombre").value;
    if (inputNombre == "") {
        const divMensaje = document.querySelector("#mensaje-error");
        divMensaje.innerHTML = "";
        const divAlert = document.createElement("div");
        divAlert.setAttribute("class", "alert alert-danger");
        divAlert.innerText = "Debe Ingresar un Nombre";
        divMensaje.appendChild(divAlert);
    } else {
        console.log("entro 4");
        nombreJugador = inputNombre;
        modalBienvenida.hide();
        cargarDatos(inputNombre);
    }
}

const cargarDatos = (nombre) => {
    console.log(nombre);
    const lblnombre = document.querySelector("#user");
    lblnombre.textContent = nombre;
}

const actualizar1 = (url1, url2, url_estatico, maquina) => {
    const imagen = document.querySelector(maquina);
    imagen.setAttribute("src", url_estatico);
    setTimeout(() => {
        imagen.setAttribute("src", url1);
    }, 1500);
    setTimeout(() => {
        imagen.setAttribute("src", url2);

        if (maquina == "#maquina-1") {
            if (ganancia_m > 0) {
                let divAudio = document.querySelector("#audio-ganaste");
                divAudio.innerHTML = "<audio src='Musica/ganaste.mp3' autoplay type='audio/mpeg'></audio>"
                console.log("gano m1");
                ganancia_maq1 = parseInt(document.querySelector("#apuesta-1").textContent) * ganancia_m;
                document.querySelector("#apuesta-1").textContent = ganancia_maq1;
                cambiarCobrarJugar(maquina);

                let ap1 = document.querySelector("#min-m1");
                let ap2 = document.querySelector("#max-m1");
                ap1.disabled = true;
                ap2.disabled = true;

                console.log(cobrar_m1);
            } else {
                console.log("entro 14");
                let ap1 = document.querySelector("#min-m1");
                let bj = document.querySelector("#jugar");
                ap1.disabled = true;
                bj.disabled = true;
                let cantActual = document.querySelector("#apuesta-1");
                cantActual.textContent = 0;
            }
        } else {
            if (ganancia_m > 0) {
                let divAudio = document.querySelector("#audio-ganaste");
                divAudio.innerHTML = "<audio src='Musica/ganaste.mp3' autoplay type='audio/mpeg'></audio>"
                console.log("gano m2");
                ganancia_maq2 = parseInt(document.querySelector("#apuesta-2").textContent) * ganancia_m;
                document.querySelector("#apuesta-2").textContent = ganancia_maq2;
                cambiarCobrarJugar(maquina);

                let ap1 = document.querySelector("#min-m2");
                let ap2 = document.querySelector("#max-m2");
                ap1.disabled = true;
                ap2.disabled = true;

            } else {
                let cantActual = document.querySelector("#apuesta-2");
                cantActual.textContent = 0;
                console.log("entro 20");
                let ap1 = document.querySelector("#min-m2");
                let bj = document.querySelector("#jugar-2");
                ap1.disabled = true;
                bj.disabled = true;

            }
        }

    }, 2000);
}



const cambiarCobrarJugar = (maquina) => {
    if (maquina == "#maquina-1") {
        let btnCobrarJugar = document.querySelector("#jugar").textContent;
        let botonCobrarJugar = document.querySelector("#jugar");
        if (btnCobrarJugar == "Jugar") {
            botonCobrarJugar.textContent = "Cobrar";
            cobrar_m1 = true;
        } else {
            botonCobrarJugar.textContent = "Jugar";
            cobrar_m1 = false;
        }
    } else {
        let btnCobrarJugar = document.querySelector("#jugar-2").textContent;
        let botonCobrarJugar = document.querySelector("#jugar-2");
        if (btnCobrarJugar == "Jugar") {
            botonCobrarJugar.textContent = "Cobrar";
            cobrar_m2 = true;
        } else {
            botonCobrarJugar.textContent = "Jugar";
            cobrar_m2 = false;
        }
    }
}

const incrementarNum = () => {
    num_apuesta++;
    document.querySelector("#num_apuesta").textContent = num_apuesta;
}

const incrementarGananciaAcumulara = (ganancia_acumulada) => {
    document.querySelector("#coins_acum").textContent = ganancia_acumulada;
}


const jugarmaquina = () => {
    console.log("entrando" + cobrar_m1);
    if (cobrar_m1 == false) {

        let divAudio = document.querySelector("#audio-cartas");
        divAudio.innerHTML = "<audio src='Musica/cartas.mp3' autoplay type='audio/mpeg'></audio>"

        let cantActual = parseInt(document.querySelector("#apuesta-1").textContent);
        if (cantActual > 0) {
            incrementarNum();
            console.log("maquina jugada");
            var i = 1
            var maquina = 'maquinaA'
            apuesta = parseInt(document.querySelector("#apuesta-1").textContent);
            var intento = apostarYJugar(maquinas[maquina])
            imprimirIntento(i, maquina, intento)
            let primerCarta = intento.resultado[0];
            let segundaCarta = intento.resultado[1];
            switch (primerCarta) {
                case "A":
                    switch (segundaCarta) {
                        case "A": actualizar1("imagenes/A-ESTATICO.gif", "imagenes/A-AWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "J": actualizar1("imagenes/A-ESTATICO.gif", "imagenes/A-JWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "Q": actualizar1("imagenes/A-ESTATICO.gif", "imagenes/A-QWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "K": actualizar1("imagenes/A-ESTATICO.gif", "imagenes/A-KWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                    };
                    break;
                case "Q":
                    switch (segundaCarta) {
                        case "A": actualizar1("imagenes/Q-ESTATICO.gif", "imagenes/Q-AWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "J": actualizar1("imagenes/Q-ESTATICO.gif", "imagenes/Q-JWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "Q": actualizar1("imagenes/Q-ESTATICO.gif", "imagenes/Q-QWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "K": actualizar1("imagenes/Q-ESTATICO.gif", "imagenes/Q-KWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                    };
                    break;
                case "K":
                    switch (segundaCarta) {
                        case "A": actualizar1("imagenes/K-ESTATICO.gif", "imagenes/K-AWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "J": actualizar1("imagenes/K-ESTATICO.gif", "imagenes/K-JWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "Q": actualizar1("imagenes/K-ESTATICO.gif", "imagenes/K-QWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "K": actualizar1("imagenes/K-ESTATICO.gif", "imagenes/K-KWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                    };
                    break;
                case "J":
                    switch (segundaCarta) {
                        case "A": actualizar1("imagenes/J-ESTATICO.gif", "imagenes/J-AWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "J": actualizar1("imagenes/J-ESTATICO.gif", "imagenes/J-JWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "Q": actualizar1("imagenes/J-ESTATICO.gif", "imagenes/J-QWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                        case "K": actualizar1("imagenes/J-ESTATICO.gif", "imagenes/J-KWIN.png", "imagenes/prueba.gif", "#maquina-1"); break;
                    };
                    break;
            }
            console.log("antes final" + cobrar_m1);
        }
        console.log("final" + cobrar_m1);
    } else {
        let divAudio = document.querySelector("#audio-cobrar");
        divAudio.innerHTML = "<audio src='Musica/cobrar.mp3' autoplay type='audio/mpeg'></audio>"
        if (ganancia_maq1 > 0) {
            console.log(cobrar_m1);
            let saldo = parseInt(document.querySelector("#coins").textContent);
            let lblsaldo = document.querySelector("#coins");
            let cantActual = document.querySelector("#apuesta-1");
            console.log("saldo=" + saldo);
            console.log("ganancia=" + ganancia_maq1);
            lblsaldo.textContent = saldo + ganancia_maq1;
            cantActual.textContent = 0;
            ganancia_acumulada += ganancia_maq1;
            incrementarGananciaAcumulara(ganancia_acumulada);
            cambiarCobrarJugar("#maquina-1");
            let ap1 = document.querySelector("#min-m1");
            let ap2 = document.querySelector("#max-m1");
            let bj = document.querySelector("#jugar");
            ap1.disabled = true;
            ap2.disabled = false;
            bj.disabled = true;
        }
    }

}

const jugarmaquina2 = () => {
    if (cobrar_m2 == false) {
        let divAudio = document.querySelector("#audio-cartas");
        divAudio.innerHTML = "<audio src='Musica/cartas.mp3' autoplay type='audio/mpeg'></audio>"
        let cantActual = parseInt(document.querySelector("#apuesta-2").textContent);
        if (cantActual > 0) {
            incrementarNum();
            console.log("maquina jugada 2");
            var i = 1
            var maquina = 'maquinaB'
            apuesta = parseInt(document.querySelector("#apuesta-2").textContent);
            var intento = apostarYJugar(maquinas[maquina])
            imprimirIntento(i, maquina, intento)
            let primerCarta = intento.resultado[0];
            let segundaCarta = intento.resultado[1];
            switch (primerCarta) {
                case "A":
                    switch (segundaCarta) {
                        case "A": actualizar1("imagenes/maquina2/M2-A-ESTATICO.gif", "imagenes/maquina2/M2-AAWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "J": actualizar1("imagenes/maquina2/M2-A-ESTATICO.gif", "imagenes/maquina2/M2-AJWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "Q": actualizar1("imagenes/maquina2/M2-A-ESTATICO.gif", "imagenes/maquina2/M2-AQWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "K": actualizar1("imagenes/maquina2/M2-A-ESTATICO.gif", "imagenes/maquina2/M2-AKWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                    };
                    break;
                case "Q":
                    switch (segundaCarta) {
                        case "A": actualizar1("imagenes/maquina2/M2-Q-ESTATICO.gif", "imagenes/maquina2/M2-QAWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "J": actualizar1("imagenes/maquina2/M2-Q-ESTATICO.gif", "imagenes/maquina2/M2-QJWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "Q": actualizar1("imagenes/maquina2/M2-Q-ESTATICO.gif", "imagenes/maquina2/M2-QQWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "K": actualizar1("imagenes/maquina2/M2-Q-ESTATICO.gif", "imagenes/maquina2/M2-QKWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                    };
                    break;
                case "K":
                    switch (segundaCarta) {
                        case "A": actualizar1("imagenes/maquina2/M2-K-ESTATICO.gif", "imagenes/maquina2/M2-KAWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "J": actualizar1("imagenes/maquina2/M2-K-ESTATICO.gif", "imagenes/maquina2/M2-KJWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "Q": actualizar1("imagenes/maquina2/M2-K-ESTATICO.gif", "imagenes/maquina2/M2-KQWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "K": actualizar1("imagenes/maquina2/M2-K-ESTATICO.gif", "imagenes/maquina2/M2-KKWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                    };
                    break;
                case "J":
                    switch (segundaCarta) {
                        case "A": actualizar1("imagenes/maquina2/M2-J-ESTATICO.gif", "imagenes/maquina2/M2-JAWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "J": actualizar1("imagenes/maquina2/M2-J-ESTATICO.gif", "imagenes/maquina2/M2-JJWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "Q": actualizar1("imagenes/maquina2/M2-J-ESTATICO.gif", "imagenes/maquina2/M2-JQWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                        case "K": actualizar1("imagenes/maquina2/M2-J-ESTATICO.gif", "imagenes/maquina2/M2-JKWIN.jpg", "imagenes/maquina2/maquina2.gif", "#maquina-2"); break;
                    };
                    break;
            }
        }

        /*
        fsfs
        */

    } else {
        let divAudio = document.querySelector("#audio-cobrar");
        divAudio.innerHTML = "<audio src='Musica/cobrar.mp3' autoplay type='audio/mpeg'></audio>"
        if (ganancia_maq2 > 0) {
            console.log(cobrar_m2);
            let saldo = parseInt(document.querySelector("#coins").textContent);
            let lblsaldo = document.querySelector("#coins");
            let cantActual = document.querySelector("#apuesta-2");
            console.log("saldo=" + saldo);
            console.log("ganancia=" + ganancia_maq2);
            lblsaldo.textContent = saldo + ganancia_maq2;
            cantActual.textContent = 0;
            ganancia_acumulada += ganancia_maq2;
            incrementarGananciaAcumulara(ganancia_acumulada);
            cambiarCobrarJugar("#maquina-2");
            let ap1 = document.querySelector("#min-m2");
            let ap2 = document.querySelector("#max-m2");
            let bj = document.querySelector("#jugar-2");
            ap1.disabled = true;
            ap2.disabled = false;
            bj.disabled = true;
        }
    }
}

const disminuirMonedas = () => {
    let saldo = parseInt(document.querySelector("#coins").textContent);
    let lblsaldo = document.querySelector("#coins");
    lblsaldo.textContent = saldo - 10;
    if ((saldo - 10) <= 0) {
        let ap = document.querySelector("#max-m1");
        let ap2 = document.querySelector("#max-m2");
        console.log(ap);
        ap.disabled = true;
        ap2.disabled = true;
    }
}

const aumentarMonedas = () => {
    let saldo = parseInt(document.querySelector("#coins").textContent);
    let lblsaldo = document.querySelector("#coins");
    lblsaldo.textContent = saldo + 10;
    console.log("entro 11");
    if ((saldo + 10) > 0) {
        console.log("entro 12");
        let ap = document.querySelector("#max-m1");
        let ap2 = document.querySelector("#max-m2");
        console.log(ap);
        ap.disabled = false;
        ap2.disabled = false;
    }
}

const disminuirApuestaM1 = () => {
    let divAudio = document.querySelector("#audio-moneda");
    divAudio.innerHTML = "<audio src='Musica/moneda.mp3' autoplay type='audio/mpeg'></audio>"
    let cantActual = parseInt(document.querySelector("#apuesta-1").textContent);
    let txt_min1 = document.querySelector("#apuesta-1");
    if (cantActual > 0) {
        cantActual -= 10;
        txt_min1.textContent = cantActual;
        console.log(cantActual);
        if (cantActual <= 0) {
            let ap = document.querySelector("#min-m1");
            let j = document.querySelector("#jugar");
            console.log(ap);
            ap.disabled = true;
            j.disabled = true;
        }
        aumentarMonedas();
    }
}

const disminuirApuestaM2 = () => {
    let divAudio = document.querySelector("#audio-moneda");
    divAudio.innerHTML = "<audio src='Musica/moneda.mp3' autoplay type='audio/mpeg'></audio>"
    let cantActual = parseInt(document.querySelector("#apuesta-2").textContent);
    let txt_min2 = document.querySelector("#apuesta-2");
    if (cantActual > 0) {
        cantActual -= 10;
        txt_min2.textContent = cantActual;
        if (cantActual <= 0) {
            let ap = document.querySelector("#min-m2");
            let j = document.querySelector("#jugar-2");
            console.log(ap);
            ap.disabled = true;
            j.disabled = true;
        }
        aumentarMonedas();
    }
}
const aumentarApuestaM1 = () => {
    let divAudio = document.querySelector("#audio-moneda");
    divAudio.innerHTML = "<audio src='Musica/moneda.mp3' autoplay type='audio/mpeg'></audio>"
    let saldo = parseInt(document.querySelector("#coins").textContent);
    let cantActual = parseInt(document.querySelector("#apuesta-1").textContent);
    let txt_min1 = document.querySelector("#apuesta-1");
    if (saldo > 0) {
        cantActual += 10;
        txt_min1.textContent = cantActual;
        if (cantActual > 0) {
            let ap = document.querySelector("#min-m1");
            let j = document.querySelector("#jugar");
            console.log(ap);
            ap.disabled = false;
            j.disabled = false;
        }
        disminuirMonedas();
    }
}

const aumentarApuestaM2 = () => {
    let divAudio = document.querySelector("#audio-moneda");
    divAudio.innerHTML = "<audio src='Musica/moneda.mp3' autoplay type='audio/mpeg'></audio>"
    let saldo = parseInt(document.querySelector("#coins").textContent);
    let cantActual = parseInt(document.querySelector("#apuesta-2").textContent);
    let txt_min2 = document.querySelector("#apuesta-2");
    if (saldo > 0) {
        cantActual += 10;
        txt_min2.textContent = cantActual;
        if (cantActual > 0) {
            let ap = document.querySelector("#min-m2");
            let j = document.querySelector("#jugar-2");
            console.log(ap);
            ap.disabled = false;
            j.disabled = false;
        }
        disminuirMonedas();
    }
}

const sonidoOffOn = () => {
    if (flagSonido == true) {
        console.log("apaga sonido");
        let s = document.querySelector("#icono-sonido");
        s.setAttribute("class", "fas fa-volume-mute");
        let divAudio = document.querySelector("#audio-fondo");
        divAudio.innerHTML = ""
        flagSonido = false
    } else {
        console.log("prende sonido");
        let s = document.querySelector("#icono-sonido");
        s.setAttribute("class", "fas fa-volume-up");
        let divAudio = document.querySelector("#audio-fondo");
        divAudio.innerHTML = "<audio src='Musica/moneda.mp3' autoplay type='audio/mpeg'></audio>"
        flagSonido = true;
    }
}


const cambiarNombre = () => {
    let numero = parseInt(document.querySelector("#num_apuesta").textContent);
    if (numero == 0) {
        console.log("cambiar imagen");
        cargarModalBienvenida();
    }

}


const main = () => {
    //modal bienvenida
    const divModal = document.querySelector("#modal_bienvenida");
    modalBienvenida = new bootstrap.Modal(divModal);
    cargarModalBienvenida();

    //modal instrucciones
    const divModalInstrucciones = document.querySelector("#modal_instrucciones");
    modalInstrucciones = new bootstrap.Modal(divModalInstrucciones);

    //boton instrucciones
    const btnInstrucciones = document.querySelector("#btn-instrucciones");
    btnInstrucciones.addEventListener("click", cargarIntrucciones);

    //modal acerca-de
    const divModalAcercaDe = document.querySelector("#modal_acerdade");
    modalAcercaDe = new bootstrap.Modal(divModalAcercaDe);

    //boton acerca-de
    const btnAcercaDe = document.querySelector("#btn-acercade");
    btnAcercaDe.addEventListener("click", cargarAcercaDe);

    //modal ranking
    const divModalRanking = document.querySelector("#modal_ranking");
    modalRanking = new bootstrap.Modal(divModalRanking);

    //boton ranking
    const btnRanking = document.querySelector("#btn-ranking");
    btnRanking.addEventListener("click", cargarRanking);

    const txtApuesta1 = document.querySelector("#apuesta-1");
    txtApuesta1.textContent = 0;
    const btnMinM1 = document.querySelector("#min-m1");
    btnMinM1.addEventListener("click", disminuirApuestaM1);
    const btnMaxM1 = document.querySelector("#max-m1");
    btnMaxM1.addEventListener("click", aumentarApuestaM1);

    const txtApuesta2 = document.querySelector("#apuesta-2");
    txtApuesta2.setAttribute("value", "0");
    const btnMinM2 = document.querySelector("#min-m2");
    btnMinM2.addEventListener("click", disminuirApuestaM2);
    const btnMaxM2 = document.querySelector("#max-m2");
    btnMaxM2.addEventListener("click", aumentarApuestaM2);


    const btncomenzar = document.querySelector("#btcomenzar-mb");
    btncomenzar.addEventListener("click", comenzar);
    //boton jugar maquina 1
    const btnjugar = document.querySelector("#jugar");
    btnjugar.addEventListener("click", jugarmaquina);
    //boton jugar maquina 2
    const btnjugar2 = document.querySelector("#jugar-2");
    btnjugar2.addEventListener("click", jugarmaquina2)


    //boton nombre de usuario
    const btnuser = document.querySelector("#user");
    btnuser.addEventListener("click", cambiarNombre);

    const sonido = document.querySelector("#sonido");
    sonido.addEventListener("click", sonidoOffOn);




    var distribuciones = getDistributions()
    console.log(distribuciones)
    maquinas = {
        maquinaA: distribuciones[0],
        maquinaB: distribuciones[1]
    }
}

window.addEventListener("load", main);
