const cartas = document.querySelectorAll('.carta');

let TemQueGirarCarta = false;
let primeiraCarta, segundaCarta;
let travaTabuleiro = false;

//função para virar carta
function girarCarta(){
    if(travaTabuleiro) return;
    if(this === primeiraCarta) return;

    this.classList.add('girar');
    if(!TemQueGirarCarta){
        TemQueGirarCarta = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    TemQueGirarCarta = false;
    checandoCarta();
}

//função que checa se as cartas são iguais
function checandoCarta(){
    if(primeiraCarta.dataset.card === segundaCarta.dataset.card){
        desativarCarta();
        return;
    }
    unGirarCarta();
}

//função que desabilita as cartas
function desativarCarta(){
    primeiraCarta.removeEventListener('click', girarCarta);
    segundaCarta.removeEventListener('click',  girarCarta);

    redefinirQuadro();
}

//funcão que desvira as cartas
function unGirarCarta(){
    travaTabuleiro = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('girar');
        segundaCarta.classList.remove('girar');

        redefinirQuadro();
    }, 1500);
}

//função que reseta o tabuleiro
function redefinirQuadro(){
    [TemQueGirarCarta, travaTabuleiro] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

//função que embaralha as cartas 
//sera executado primeiro assim as cartas sempre estarao embaralhadas
(function embaralharCarta(){
    cartas.forEach((carta) => {
        let novaPosicao = Math.floor(Math.random() * 12);
        carta.style.order = novaPosicao;
    })
})();

//adiciona evento de clique na carta
cartas.forEach((carta) => {
    carta.addEventListener('click', girarCarta);
});

