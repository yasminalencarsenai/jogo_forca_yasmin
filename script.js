let palavras = [
    "CASA", "CARRO", "BANANA", "ESCOLA", "JAVASCRIPT",
    "COMPUTADOR", "TECLADO", "INTERNET", "BRASIL",
    "ELEFANTE", "GIRASSOL", "ABACAXI", "CELULAR",
    "CACHORRO", "BORBOLETA"
];

let indice = Math.floor(Math.random() * palavras.length);

let palavraSecreta = palavras[indice];
let palavraOculta = [];

let vidasRestantes = 6;
let letrasErradas = [];
let letrasDigitadas = [];

// criar espeaços da palavra

for (let i = 0; i < palavraSecreta.length; i++) {
    palavraOculta.push("_");
}

// mostrar palavra na tela

let telaPalavra = document.querySelector("#palavra");
telaPalavra.innerHTML = palavraOculta.join(" ");

// Manipular elementos do DOM

let telaVidas = document.querySelector("#vidas");
let telaErros = document.querySelector("#erros");

let campoLetra = document.querySelector("#campo-letra");
let btnTestar = document.querySelector("#btn-testar");
let btnReiniciar = document.querySelector("#btn-reiniciar");

let statusMensagem = document.querySelector("#status");

// Partes do boneco

let partesBoneco = [
    document.querySelector("#cabeca"),
    document.querySelector("#corpo"),
    document.querySelector("#braco-esquerdo"),
    document.querySelector("#braco-direito"),
    document.querySelector("#perna-esquerda"),
    document.querySelector("#perna-direita")
];

// Evento do botão

btnTestar.addEventListener("click", testarLetra);

function testarLetra() {

    let letra = campoLetra.value.toUpperCase();

    campoLetra.value = "";
    campoLetra.focus();

    if (letra == "") {
        return;
    }

    if (letrasDigitadas.includes(letra)) {
        statusMensagem.innerHTML = "Letra já digitada!";
        return;
    }

    letrasDigitadas.push(letra);

    let encontrou = false;

    // Procurar a letra na palavra

    for (let i = 0; i < palavraSecreta.length; i++) {

        if (palavraSecreta[i] == letra) {
            palavraOculta[i] = letra;
            encontrou = true;
        }
    }

    // Verificar acerto ou erro

    if (encontrou) {

        telaPalavra.innerHTML = palavraOculta.join(" ");

    } else {

        vidasRestantes--;

        telaVidas.innerHTML = vidasRestantes;

        letrasErradas.push(letra);

        telaErros.innerHTML = letrasErradas.join(", ");

        partesBoneco[5 - vidasRestantes].style.display = "block";
    }

    // Verificar vitória ou derrota

    if (vidasRestantes == 0) {

        statusMensagem.innerHTML = "Você perdeu! Palavra: " + palavraSecreta;

        btnTestar.disabled = true;
        campoLetra.disabled = true;

    } else if (!palavraOculta.includes("_")) {

        statusMensagem.innerHTML = "Parabéns! Você venceu!";

        btnTestar.disabled = true;
        campoLetra.disabled = true;
    }
}

// Reiniciar jogo

btnReiniciar.addEventListener("click", function() {

    indice = Math.floor(Math.random() * palavras.length);
    palavraSecreta = palavras[indice];

    palavraOculta = [];
    letrasErradas = [];
    letrasDigitadas = [];

    vidasRestantes = 6;

    for (let i = 0; i < palavraSecreta.length; i++) {
        palavraOculta.push("_");
    }

    telaPalavra.innerHTML = palavraOculta.join(" ");
    telaVidas.innerHTML = vidasRestantes;
    telaErros.innerHTML = "";
    statusMensagem.innerHTML = "";

    for (let i = 0; i < partesBoneco.length; i++) {
        partesBoneco[i].style.display = "none";
    }

    btnTestar.disabled = false;
    campoLetra.disabled = false;

    campoLetra.value = "";
    campoLetra.focus();

});
