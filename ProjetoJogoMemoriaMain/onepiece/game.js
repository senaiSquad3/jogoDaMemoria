const tabuleiro = document.getElementById('tabuleiro');

const imagens = [
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png',
    'img5.png',
    'img6.png'
];

let codigoHTML = '';

imagens.forEach(img =>{
    codigoHTML += `
        <div class = "memory-card" data-carta ="${img}">
            <img class ="frente-carta" src= "imgss/${img}">
            <img class ="fundo-carta" src= "imgss/fundo.png">
        </div>
    `;
})

tabuleiro.innerHTML = codigoHTML +codigoHTML;


const cartas = document.querySelectorAll(".memory-card");

let primeira, segunda;
let bloqueio = false;
let contador = 0;

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
function atualizaContagem(){
    contador++;
    document.getElementById("contaPonto").textContent =`
    ${contador}`
};

function virar(){
    if(bloqueio) return false;  
    this.classList.add("virar");

    if(!primeira){
        primeira = this;
        atualizaContagem();
        primeira.removeEventListener('click', virar);
        return false;
    }
    segunda = this;
    atualizaContagem();
    
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



