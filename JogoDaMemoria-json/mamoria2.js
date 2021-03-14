
//Estado do Jogo
let cartas = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let cliquesTravados = false;
let temCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0;
let contaClique = 0;
let pontos = 0;

let fundo = 'imgs/versoBaralho.png';
onload = () => {
    //carrega as imagens de fundo
let elemImagens = document.querySelectorAll('#memoria img');
elemImagens.forEach( (img, i) =>{
        img.src = fundo;
        img.setAttribute('data-valor', i);
        img.style.opacity = 0.7;
    });

   //cria o evento do botão de início 
   document.querySelector('#btInicio').onclick = iniciaJogo;
};

//---------------------------------------------
// Inicia Jogo
// -----------------------------------------------

const iniciaJogo =() =>{
    //embaralhar as cartas
    for(let i=0; i < cartas.length; i++ ) {
        let p = Math.trunc(Math.random() * cartas.length);
        let aux = cartas[p];
        cartas[p] = cartas[i];
        cartas[i] = aux;
    }
    //console.log(cartas);

    //associar evento às imagens    
    let elemImagens = document.querySelectorAll(    '#memoria img');
    elemImagens.forEach((img, i) =>{
        img.onclick = trataCliqueImagem;
        img.style.opacity = 1;
        //aqui poderia start o cronmetro

    });
};

function atualizaContagem{
    contaClique = contaClique + 1;
    document.getElementById("contagem").textContent =`${contaClique}`
}

//---------------------------------------------
// Processa o clique da imagem
// --------------------------------------------

const trataCliqueImagem = (e) => {
    if(cliquesTravados) return;
    const p = +e.target.getAttribute('data-valor');
    const valor = cartas[p];
    e.target.src = imagens[valor-1];
    atualizaContagem();
    e.target.onclick = null;
    console.log('clicou');

    if(!temCartaVirada){
        temCartaVirada = true;
        posicaoCartaVirada = p;
        valorCartaVirada = valor;
    } else {
        if(valor == valorCartaVirada){
            pontos++;
        }

    }

    cliquesTravados = true;

    setTimeout(()=>{
        e.target.src = fundo;
        e.target.onclick = trataCliqueImagem;
        cliquesTravados = false;
    }, 1500);

};