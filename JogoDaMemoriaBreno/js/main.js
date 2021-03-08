const mesa = document.getElementById('mesa');

const imagens = [
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png',
    'img5.png',
    'img6.png', 
];

let codigoHTML= '';

imagens.forEach(img =>{
    codigoHTML += `
    <div class="memory-card" data-card1="${img}">
       <img class="front-card" src="imgs/${img}">
       <img class="back-card" src="imgs/fundo.png">
    </div>
    `;
});

mesa.innerHTML = codigoHTML + codigoHTML;

const cards = document.querySelectorAll(".memory-card");

let primeira,segunda;
let block = false;

(function embaralhar(){
    cards.forEach(card =>{
        let numero = Math.floor(Math.random()*12)
        card.style.order = numero;
    })
})();

function checar(){
    let ehIgual = primeira.dataset.card1 === segunda.dataset.card1?true:false;
    if(!ehIgual){
        remove();
    }else{
        reset(ehIgual);
    }
}

function virar(){
    if(block) return false;
    this.classList.add("virar");

    if(!primeira){
    primeira = this;
    primeira.removeEventListener('click', virar);
    return false;
}

segunda = this;

checar();

}

function remove(){
    block = true;
    setTimeout(()=>{
        primeira.classList.remove("virar");
        primeira.addEventListener("click", virar);
        segunda.classList.remove("virar");
        block = false;
        primeira = null;
        segunda = null;
    },1000)
}

function reset(ehIgual){
    if(ehIgual){
        primeira.removeEventListener('click', virar);
        segunda.removeEventListener('click', virar);
        [block, primeira, segunda] = [false, null, null];
    }
}

cards.forEach(c => c.addEventListener('click',virar));