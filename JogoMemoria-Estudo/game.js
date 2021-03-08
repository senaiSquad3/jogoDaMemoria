const tabuleiro = document.getElementById('tabuleiro');

const imagens = [
    'pika1.png',
    'pika2.png',
    'pika3.png',
    'pika4.png',
    'pika5.png',
    'pika6.png'
];

let codigoHTML = '';

imagens.forEach(img =>{
    codigoHTML += `
        <div class="memory-card" data-carta="${img}">
            <img class ="frente-carta" src="imgs/${img}">
            <img class = "fundo-carta" src="imgs/pokebola.png">
        </div>
    `;
})

tabuleiro.innerHTML = codigoHTML +codigoHTML;


const cartas = document.querySelectorAll(".memory-card");

let primeira, segunda;
let bloqueio = false;

function remover(){
    bloqueio = true;    
    setTimeout(()=>{
        primeira.classList.remove("virar");
        primeira.addEventListener('click', virar);
        segunda.classList.remove("virar");
        bloqueio = false;
        primeira = null;
        segunda = null;
    }, 1000)
}

(function aleatoria(){
    cartas.forEach(carta => {
        let numero =Math.floor(Math.random()*12);
        carta.style.order = numero;

    });
})();

function checar(){
    let ehIgual = primeira.dataset.carta === segunda.dataset.carta?true:false;
    //console.log(ehIgual);
    if(!ehIgual){
        remover();
    }
    else{
        reset(ehIgual);
    }
}

function virar(){
    if(bloqueio) return false;  
    this.classList.add("virar");

    if(!primeira){
        primeira = this;
        primeira.removeEventListener('click', virar);
        return false;
    }
    segunda = this;
    
    checar();

    
}

function reset(ehIgual){
    if(ehIgual){
        //aqui adicionar um placar?
        primeira.removeEventListener('click', virar);
        segunda.removeEventListener('click', virar);
        [bloqueio, primeira, segunda] = [false, null, null];
        
    }
}

cartas.forEach(c => c.addEventListener('click', virar));



