//arquivo json que contem os temas
var onepiece
fetch('./temas/onepiece.json')
.then(response => response.json())
.then(data =>{
    onepiece = data
})
.catch(error =>console.error(error))

var pokemon
fetch('./temas/pokemon.json')
.then(response => response.json())
.then(data =>{
    pokemon = data
})
.catch(error =>console.error(error))

var coringa
fetch('./temas/coringa.json')
.then(response => response.json())
.then(data =>{
    coringa = data
})
.catch(error =>console.error(error))

var baralho
fetch('./temas/cartasBaralho.json')
.then(response => response.json())
.then(data =>{
    baralho = data
})
.catch(error =>console.error(error))


//Estado do Jogo
let cartas = [1,1,2,2,3,3,4,4,5,5,6,6];
let cliquesTravados = false;
let temCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0;
let contaClique = 0;
let pontos = 0;
const timerDoJogo = new Timer("#timer");  

//--------------------------------------------
var imagens=[];
var fundo;

function alteraTema(valor){
    switch(valor){
        case '1' :
            deck = pokemon;
            console.log(deck);
            break;
        case '2':
            deck = onepiece;
            console.log(deck);
            break;
        case '3':
            deck = coringa;
            console.log(deck);
            break;
        case '4':
            deck = baralho;
            console.log(deck);
            break;
        default:
            console.log("saiu"  );
    }   
    
    colocarCartasTabuleiro();
   
}

function colocarCartasTabuleiro(){
    //  carrega as imagens de fundo

    back = "url("+deck.back+")" 
    var x = document.getElementsByTagName("BODY")[0];
    x.style.backgroundImage = back;

    imagens = deck.cartas;

    fundo = "./imgs/" + deck.cover;

    let elemImagens = document.querySelectorAll('#memoria img');
    elemImagens.forEach( (img, i) =>{
        img.src = fundo;
        img.setAttribute('data-valor', i);
        img.style.opacity = 0.5;
    });

    //cria o evento do botão de início 
   document.querySelector('#btInicio').onclick = iniciaJogo;

}


//-----------------------

const iniciaJogo =() =>{

        //reinicia o estado do jogo
        cliquesTravados = false;
        temCartaVirada = false;
        posicaoCartaVirada = -1;
        valorCartaVirada = 0;
        contaClique = 0;
        pontos = 0;
        
        document.getElementById("contagem").textContent = 0; 

    //embaralhar as cartas
    for(let i=0; i < cartas.length; i++ ) {
        let p = Math.trunc(Math.random() * cartas.length);
        let aux = cartas[p];
        cartas[p] = cartas[i];
        cartas[i] = aux;
    }
    //console.log(cartas);

    //associar evento às imagens    
    let elemImagens = document.querySelectorAll('#memoria img');
    elemImagens.forEach((img, i) =>{
        img.onclick = trataCliqueImagem;
        img.style.opacity = 1;
        img.src = fundo;
     

    });

    timerDoJogo.start();

};


function atualizaContagem() {
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

    if(!temCartaVirada){
        temCartaVirada = true;
        posicaoCartaVirada = p;
        valorCartaVirada = valor;
    } else {
        if(valor == valorCartaVirada){
            pontos++;
        }else{
            const p0 = posicaoCartaVirada;
            cliquesTravados = true;
            setTimeout(()=>{
                e.target.src = fundo;
                e.target.onclick = trataCliqueImagem;
                let img = document.querySelector('#memoria #i'+ p0);
                img.src = fundo;
                img.onclick = trataCliqueImagem;
                cliquesTravados = false;
            }, 1500);
        }

        temCartaVirada = false;
        posicaoCartaVirada = -1;
        valorCartaVirada= 0;

    }

    if(pontos==6){
        timerDoJogo.stop();
        alert("Você conseguiu! Parabéns!");

    }
};

//---------------------------------
//Timer
//---------------------------------

function Timer(e){
    this.element = e;
    this.time = 0;      
    this.control = null;
    this.start = () =>{
        this.time = 0;
        this.control = setInterval(() => {
            this.time++;
            const minutes = Math.trunc(this.time / 60);
            const seconds = this.time % 60;
            document.querySelector("#timer").innerHTML = 
            (minutes < 10 ? '0':'') + minutes +':'+(seconds < 10 ? '0':'') + seconds;
        }, 1000)
    };  
    this.stop = () =>{
        clearInterval(this.control);   
        this.control = null; 
    };    
    
}
