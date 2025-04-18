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
let conteo = 5;
let cuadro = 20;
const fuente = "Silkscreen"

const binary = document.querySelectorAll("#binary");

binary.forEach( (div) => {
    div.addEventListener("click", (e) => {
        if (div.textContent == "off"){
            div.textContent = "on";
            posBinarios[e.target.className] = 1;
        } else {
            div.textContent = "off";
            posBinarios[e.target.className] = 0;
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

let equis = 20;

// Funcion que dibuja la cantidad de paredes que faltan
function dibujaCuadro(){
    ctx2.clearRect(0,0,canvas.width,canvas.height);
    equis = 20;
    for(let i = conteo; i > 0; i--){
        // Dibujando los cuadros que representan la cantidad de paredes que faltan
        ctx2.strokeStyle = "blue";
        ctx2.strokeRect(equis,470,20,20);
        equis +=30;

        ctx2.font = `20px ${fuente}` ;
        ctx2.fillText(`quedan ${conteo} paredes`, 20, 460);
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
perrito.src = "Assets/perrito1.png";

class Enemy{
    constructor(){
        this.x = 10;
        this.y = 30;
        this.randomValue = Math.floor(Math.random() * 32);

        this.signalX = this.x;
        this.signalY = this.y;

        
        

    }

    update(){
        this.x = this.x + 0.2;
        // console.log("la X: ",this.x);
        
        // Collider para el game over
        if(this.x >= 500){
            console.log("LOSE...");
            gameOver = true;
            ctx.font = `100px ${fuente}`;
            ctx.fillStyle = "red";
            ctx.fillText("GAME OVER", 350, 250);
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
            gameOver = true;
            ctx.font = `100px ${fuente}`;
            ctx.fillStyle = "blue";
            ctx.fillText("GANASTE", 350, 250);
            setTimeout(() => {
                const anchor = document.querySelector(".ganaste");
                anchor.click()
            }, 3000);
        }
    }

    draw() {
        ctx.drawImage(logoUN, this.x, this.y, 100, 100);
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
        ctx.strokeRect(this.x, this.y, 45, 400);

        // punto de respaw
        this.signalX = spawn;

        // punto de inicio de la pared
        ctx.fillRect(this.signalX, this.signalY +125, 10, 100);

        // ubicacion del personaje
        ctx.drawImage(perrito, 320, 280, 400, 200);
        ctx.strokeRect(550, 350, 50, 50);

        // numero en decimal
        ctx.font = `30px ${fuente}`;
        ctx.textAlign = "center";
        ctx.strokeText(this.randomValue, this.x+20, this.y + 200);

    }



}

const rectangle = new Enemy();
let sumaBinaria;
let spawn = 10;

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangle.draw();
    rectangle.update();
    if( (posBinarios.uno === 1) && (rectangle.randomValue === posBinarios.uno) ){
        console.log("binario");

    }
    
    // console.log(`${posBinarios.dieciseis} ${posBinarios.ocho} ${posBinarios.cuatro} ${posBinarios.dos} ${posBinarios.uno}`);
    // console.log((posBinarios.dieciseis * (2**4)) + (posBinarios.ocho * (2**3)) + (posBinarios.cuatro * (2**2)) + (posBinarios.dos * (2**1)) + (posBinarios.uno * (2**0)));

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
    
    


    if(gameOver === false){
        requestAnimationFrame(animate)
    } else {
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
        rectangle.randomValue = Math.floor(Math.random() * 32);
        console.log("spawn", spawn);
        rectangle.x = spawn;
        conteo--
        console.log(conteo);
        dibujaCuadro()
        
    } else {
        console.log("NO iguales");
        spawn += 30;
        rectangle.x = spawn;
    }
});


animate();
