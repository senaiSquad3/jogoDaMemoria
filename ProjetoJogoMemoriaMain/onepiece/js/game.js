const tabuleiro = document.getElementById('tabuleiro');

const imagens = [
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png',
    'img5.png',
    'img6.png',
];

let codigoHTML = '';

imagens.forEach(img => {
    codigoHTML += `
        <div class="memory-card" data-carta="${img}">
            <img class="frente-carta" src="imgs/${img}">
            <img class"fundo-carta" src="imgs/fundo.png">
        </div>
    `;
});

tabuleiro.innerHTML = codigoHTML + codigoHTML;

const cartas = document.querySelectorAll(".memory-card");


let primeira, segunda;
let bloqueio = false;


function aleatoria(){
    cartas.forEach(carta => {
        let numero = Math.floor (Math.random()*12);
        carta.style.order = numero;
    });
};

function checar(){
    
    let eIgual = primeira.dataset.carta === segunda.dataset.carta?true:false;

    if(!eIgual){
        remover();
    }else{
        reset(eIgual);
    }
}

function remover(){
    bloqueio = true;
    setTimeout(()=>{
        primeira.classList.remove("virar");
        segunda.classList.remove("virar");
        primeira.addEventListener("click", virar);
        bloqueio = false;
        primeira = null;
        segunda = null;
    },1000)
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


function reset(eIgual){
    if(eIgual) {
        primeira.removeEventListener('click', virar);
        segunda.removeEventListener('click',virar);
        bloqueio = false;
        primeira = null;
        segunda = null;
    }
}

aleatoria();

cartas.forEach(c => c.addEventListener('click', virar));

var contador = document.querySelector('.badge');


document.querySelector('#tabuleiro').addEventListener('click', function(){
  if (bloqueio == false) {
        var numero = parseInt(contador.textContent) + 1;
        contador.textContent = numero;
    }
  
});
