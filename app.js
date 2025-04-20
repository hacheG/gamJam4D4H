/** @type {HTMLCanvasElement} */

 const posBinarios = {
    uno : 0,
    dos : 0,
    cuatro : 0,
    ocho : 0,
    dieciseis : 0,
    treintaydos : 0,
};

let gameOver = false;
let gameWin = false;
let conteo = 10;
let cuadro = 20;
const fuente = "Silkscreen";
let gameFrame = 0;
let ghostFrame = 0;
let catdesinflado = 0;

let estado = 0;

const binary = document.querySelectorAll("#binary");

binary.forEach( (div) => {
    div.addEventListener("click", (e) => {
        // console.log(e.target.classList);
        
        if (div.classList.contains("off") ){
            div.classList.add("on");
            div.classList.remove("off");
            // div.textContent = "on";
            posBinarios[e.target.classList[0]] = 1;
        } else {
            // div.textContent = "off";
            div.classList.add("off");
            div.classList.remove("on");
            posBinarios[e.target.classList[0]] = 0;
        }
    })
})

// Canvas primario
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 500;

// Canvas secundario para contar las paredes que faltan
const paredesCanvas = document.querySelector("#paredesCanvas");
const ctx2 = paredesCanvas.getContext("2d");
paredesCanvas.width = 700;
paredesCanvas.height = 500;

// let equis = 20;

// Funcion que dibuja la cantidad de paredes que faltan
function dibujaCuadro(){
    ctx2.clearRect(0,0,canvas.width,canvas.height);
    equis = 40;
    for(let i = conteo; i > 0; i--){
        // Dibujando los cuadros que representan la cantidad de paredes que faltan
        ctx2.fillStyle = "#c2edc0";
        ctx2.fillRect(equis,5,20,20);
        equis +=30;

        ctx2.font = `20px ${fuente}` ;
        ctx2.fillText(`quedan ${conteo} paredes`, 40, 45);
    };
};

dibujaCuadro();

// Imagenes
const logoUN = new Image();
logoUN.src = "Assets/UNGAMES.png";
// logoUN.src = "Assets/test.png";

const gifPerro = new Image();
gifPerro.src = "Assets/perroMov.gif";

const perrito = new Image();
perrito.src = "Assets/spritePerroVerde2.png";

const ghost = new Image();
ghost.src = "Assets/spritesPerroFantasma.png";

const ganador = new Image();
ganador.src = "Assets/spritesPerroGanador.png";

const gato = new Image();
gato.src = "Assets/spritesGatoPerfil.png";

const catLose = new Image();
catLose.src = "Assets/spritesGatoPerdedor.png";

const bat = new Image();
bat.src = "Assets/enemy1.png";

const barra = new Image();
barra.src = "Assets/Barra.png";

const fondo = new Image();
fondo.src = "Assets/fondo300.png";

// Sonido
const gamePlay = new Audio();
gamePlay.src = "Sonido/GameplayVer1.mp3";

class Enemy{
    constructor(){
        this.x = 10;
        this.y = 60;
        this.randomValue = Math.floor(Math.random() * 63);
        // this.randomValue = Math.floor(Math.random() * 1);

        this.signalX = this.x;
        this.signalY = this.y;

        // this.frame = 0;
        // this.enemyX = 0;
        // this.enemyY = 0;
        // this.enemyWidth = 1758/6;
        // this.enemyHeight = 155;
        
        this.frameDog = 0;
        this.dogX = 0;
        this.dogY = 0;
        this.dogWidth = 7258/19;
        this.dogHeight = 642;

        this.frameCat = 0;
        this.catX = 0;
        this.catY = 0;
        this.catWidth = 4928/4;
        this.catHeight = 1284;

        this.frameGhost = 0;
        this.ghostX = 0;
        this.ghostY = 0;
        this.ghostWidth = 9168/12;
        this.ghostHeight = 1284;

        this.frameWin = 0;
        this.winX = 0;
        this.winY = 0;
        this.winWidth = 3056/4 ;
        this.winHeight = 1284;

        this.frameCatLose = 0;
        this.catLoseX = 0;
        this.catLoseY = 0;
        this.catLoseWidth = 22176/18 ;
        this.catLoseHeight = 1284;

    }

    update(){
        if(gameFrame % 10 === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
            this.frameDog > 17 ? this.frameDog = 0 : this.frameDog++;
            this.frameCat > 2 ? this.frameCat = 0 : this.frameCat++;
            // this.frameGhost > 10 ? this.frameGhost = 4 : this.frameGhost++;
        }
        
        if(ghostFrame % 15 === 0 && estado == 1){
            this.frameGhost > 10 ? this.frameGhost = 0 : this.frameGhost++;
        }

        if(ghostFrame % 18 === 0 && estado == 2){
            this.frameWin > 2 ? this.frameWin = 0 : this.frameWin++;
            // this.frameCatLose > 16 ? this.frameCatLose = 0 : this.frameCatLose++;
        }

        if(catdesinflado % 18 === 0 && estado == 2){
            this.frameCatLose > 16 ? this.frameCatLose = 0 : this.frameCatLose++;
        }

        if (estado === 0){
            this.x = this.x + 0.2;
        }
        // console.log("la X: ",this.x);
        
        // Collider para el game over
        if(this.x >= 500){
            console.log("LOSE...");
            ghostFrame++;
            console.log(ghostFrame);
            estado = 1;
            // gameOver = true;
            ctx2.font = `100px ${fuente}`;
            ctx2.fillStyle = "#8cff00";
            ctx2.fillText("GAME OVER", 50, 250);
            ctx2.strokeStyle = "#000";
            ctx2.strokeText("GAME OVER", 50, 250);
            const seleccionar = document.querySelector(".container-button");
            seleccionar.style = "visibility: hidden";

            setTimeout(() => {
                const anchor = document.querySelector(".gameOver");
                anchor.click()
                // const originURL = location.origin
                // const newURL = originURL+"/gameOver.html";
                // const newURL = "/gameOver.html";
                // history.pushState(null,"",newURL);
                // location.reload();
                
            }, 3000);
        }

        if(conteo === 0){
            //gameWin = true;
            ghostFrame++;
            catdesinflado++;
            estado = 2;
            ctx2.font = `100px ${fuente}`;
            ctx2.fillStyle = "#8cff00";
            ctx2.fillText("GANASTE", 50, 250);
            ctx2.strokeStyle = "#000";
            ctx2.strokeText("GANASTE", 50, 250);
            const seleccionar = document.querySelector(".container-button");
            seleccionar.style = "visibility: hidden";
            setTimeout(() => {
                const anchor = document.querySelector(".ganaste");
                anchor.click()
            }, 5000);
        }
    }

    draw() {
        ctx.drawImage(fondo,
            0,
            0,
            900,
            642,
            0,
            0,
            canvas.width,
            canvas.height);

        // ctx.drawImage(bat, 
        //     this.enemyWidth * this.frame, 
        //     this.enemyY, 
        //     this.enemyWidth, 
        //     this.enemyHeight, 
        //     550, 
        //     70, 
        //     100, 
        //     50);
        // ctx.drawImage(bat, 
        //     this.enemyWidth * this.frame, 
        //     this.enemyY, 
        //     this.enemyWidth, 
        //     this.enemyHeight, 
        //     150, 
        //     40, 
        //     50, 
        //     25);
        // ctx.drawImage(bat, 
        //     this.enemyWidth * this.frame, 
        //     this.enemyY, 
        //     this.enemyWidth, 
        //     this.enemyHeight, 
        //     190, 
        //     55, 
        //     50, 
        //     25)

        // ctx.drawImage(logoUN, this.x, this.y, 100, 100);
        // cantidad de paredes que faltan
        // ctx.fillText(conteo, 650, 30);

        
        // for(let i = conteo; i > 0; i--){
        //     console.log(i);
        //     ctx.strokeStyle = "blueViolet";
            
            // ctx.strokeRect(20, 450, 10, 10);
            // ctx.strokeRect(40, 450, 10, 10);
        //     cuadro += 2
            
        // ctx.save();
        // ctx.strokeStyle = "blueViolet";
        // ctx.strokeRect(20, 450, 10, 10);
        // ctx.restore();
        // }
        // ctx.strokeRect(20, 450, 10, 10);

        // Pared movil
        ctx.strokeStyle = "blueViolet";
        // ctx.strokeRect(this.x, this.y, 45, 400);
        ctx.drawImage(barra,
            0,
            0,
            302,
            1284,
            this.x,
            this.y -10,
            85,
            420
        );

        // punto de respaw
        this.signalX = spawn;

        // punto de inicio de la pared
        ctx.fillStyle = "#8cff00";
        // ctx.fillRect(this.signalX, this.signalY +125, 10, 100);
        // ctx.drawImage(gato,
        //     this.catWidth * this.frameCat,
        //     this.catY,
        //     this.catWidth,
        //     this.catHeight,
        //     this.signalX - 245,
        //     this.signalY + 180,
        //     250,
        //     250
        // );

        // ubicacion del personaje
        // if(gameOver === false){
        //     ctx.drawImage(perrito, 
        //         this.dogWidth * this.frameDog, 
        //         this.dogY, 
        //         this.dogWidth, 
        //         this.dogHeight,
        //         550,
        //         350,
        //         70,
        //         120);
        //     }else if(gameOver === true){
        //     ctx.drawImage(ghost, 
        //         this.ghostWidth * this.frameGhost, 
        //         this.ghostY, 
        //         this.ghostWidth, 
        //         this.ghostHeight,
        //         550,
        //         350,
        //         70,
        //         120);
        //     }
            switch (estado) {
                case 0:
                    ctx.drawImage(perrito, 
                        this.dogWidth * this.frameDog, 
                        this.dogY, 
                        this.dogWidth, 
                        this.dogHeight,
                        550,
                        350,
                        70,
                        120);
                    ctx.drawImage(gato,
                        this.catWidth * this.frameCat,
                        this.catY,
                        this.catWidth,
                        this.catHeight,
                        this.signalX - 245,
                        this.signalY + 180,
                        250,
                        250);
                    break;
                case 1:
                    ctx.drawImage(ghost, 
                        this.ghostWidth * this.frameGhost, 
                        this.ghostY, 
                        this.ghostWidth, 
                        this.ghostHeight,
                        550,
                        350,
                        70,
                        120);
                    ctx.drawImage(gato,
                        this.catWidth * this.frameCat,
                        this.catY,
                        this.catWidth,
                        this.catHeight,
                        this.signalX - 245,
                        this.signalY + 180,
                        250,
                        250);
                    break;
                case 2:
                    ctx.drawImage(ganador,
                        this.winWidth * this.frameWin,
                        this.winY,
                        this.winWidth,
                        this.winHeight,
                        550,
                        350,
                        70,
                        120);
                    ctx.drawImage(catLose,
                        this.catLoseWidth * this.frameCatLose,
                        this.catLoseY,
                        this.catLoseWidth,
                        this.catLoseHeight,
                        this.signalX - 245,
                        this.signalY + 180,
                        250,
                        250);
                    break;

            
                default:
                    break;
            }
            // ctx.strokeRect(550, 420, 50, 50);

        // numero en decimal
        ctx.font = `30px ${fuente}`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#09250f";
        ctx.fillText(this.randomValue, this.x+26, this.y + 200);
        ctx.fillStyle = "#8cff00";
        ctx.fillText("_", this.x+26, this.y + 205);
        ctx.strokeStyle = "#000";
        ctx.strokeText("_", this.x+29, this.y + 205);
        ctx.strokeStyle = "#000";
        ctx.strokeText(this.randomValue, this.x+24, this.y + 200);

    }



}

const rectangle = new Enemy();
let sumaBinaria;
let spawn = 10;

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangle.update();
    rectangle.draw();
    gameFrame++;
    gamePlay.play();
    gamePlay.volume = 0.1
    if( (posBinarios.uno === 1) && (rectangle.randomValue === posBinarios.uno) ){
        console.log("binario");

    }
    
    // console.log(`${posBinarios.treintaydos} ${posBinarios.dieciseis} ${posBinarios.ocho} ${posBinarios.cuatro} ${posBinarios.dos} ${posBinarios.uno}`);
    // console.log( (posBinarios.treintaydos * (2**5)) + (posBinarios.dieciseis * (2**4)) + (posBinarios.ocho * (2**3)) + (posBinarios.cuatro * (2**2)) + (posBinarios.dos * (2**1)) + (posBinarios.uno * (2**0)));

    sumaBinaria = (posBinarios.treintaydos * (2**5) + posBinarios.dieciseis * (2**4)) + (posBinarios.ocho * (2**3)) + (posBinarios.cuatro * (2**2)) + (posBinarios.dos * (2**1)) + (posBinarios.uno * (2**0))
    // console.log("sumaBinaria",sumaBinaria);

    // if(rectangle.x >= 500){
    //     console.log("LOSE...");
    //     gameOver = true;
    // }

    // Dibujando la cantidad de paredes
//     ctx.save();
// for(let i = conteo; i > 0; i--){
//     console.log(i);
//     ctx.strokeStyle = "blueViolet";
    
//     ctx.strokeRect(20, 450, 10, 10);
//     cuadro += 2
    
// }
// ctx.restore();
    
    

// requestAnimationFrame()
    if(gameOver === false){
        requestAnimationFrame(animate)
    } else if (gameOver === true || gameWin === true){
        requestAnimationFrame(animate)
        setTimeout(() => {
            requestAnimationFrame()
            
        }, 3000);
    }
    
    if(gameWin === true){
        gameOver = true
        console.log("gane con trampa");
        
        requestAnimationFrame()
    }


};

// Dibujando la cantidad de paredes



// comparacion del binario con el decimal
const boton = document.querySelector("button");
boton.addEventListener("click", () => {
    if (sumaBinaria === rectangle.randomValue){
        console.log("iguales");
        spawn += 10;
        rectangle.randomValue = Math.floor(Math.random() * 63);
        // rectangle.randomValue = Math.floor(Math.random() * 1);
        console.log("spawn", spawn);
        rectangle.x = spawn;
        conteo--
        console.log(conteo);
        dibujaCuadro()
        
    } else {
        console.log("NO iguales");
        spawn += 70;
        rectangle.x = spawn;
    }
});


animate();
// dibujaCuadro();
